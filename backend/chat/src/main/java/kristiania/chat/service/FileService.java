package kristiania.chat.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
public class FileService {

    @Value("${DOWNLOAD_PATH:/downloads}")
    String downloadDirectory;
    @Value("${COURSE_MATERIAL_PATH:/courseMaterial}")
    String courseMaterialDirectory;
    //private final File unzipDirectory = new File(courseMaterialDirectory);

    String baseUri = "http://canvas-service:8060/api/canvas";
    String testCourseId = "PJ6100-1";

    //Based on solution in this thread: https://stackoverflow.com/questions/34660698/download-zip-file-using-url-in-java
    private void downloadCourseZip(String courseId) {
        String downloadUri = baseUri + "/courseId/" + courseId + "/zipArchiveStream";
        URI uri = URI.create(downloadUri);
        Path downloadDir = Path.of(downloadDirectory);

        try {
            Files.createDirectories(downloadDir);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Path zipFile = downloadDir.resolve(courseId + ".zip");

        try (
            ReadableByteChannel rbc = Channels.newChannel(uri.toURL().openStream());
            FileOutputStream fos = new FileOutputStream(zipFile.toFile());
        ) {
            fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        unzipFiles(courseId);
        //GET to http://canvas-service/api/...
        //Store in new folder resources/downloads
        //unzip to /resources/courses/{courseId}
    }

    // Based on tutorial from https://www.baeldung.com/java-compress-and-uncompress
    public void unzipFiles(String courseId) {
        String fileZip = downloadDirectory + "/" + courseId + ".zip";
        File destinationDirectory = new File(courseMaterialDirectory, courseId);

        byte[] buffer = new byte[256 * 1024];

        try {
            ZipInputStream zis = new ZipInputStream(new FileInputStream(fileZip));
            ZipEntry zipEntry = zis.getNextEntry();

            while (zipEntry != null) {
                File newFile = newFile(destinationDirectory, zipEntry);
                if (zipEntry.isDirectory()) {
                    if (!newFile.isDirectory() && !newFile.mkdirs()) {
                        throw new IOException("Failed to create directory " + newFile);
                    }
                } else {
                    // fix for Windows-created archives
                    File parent = newFile.getParentFile();
                    if (!parent.isDirectory() && !parent.mkdirs()) {
                        throw new IOException("Failed to create directory " + parent);
                    }

                    // write file content
                    FileOutputStream fos = new FileOutputStream(newFile);
                    int len;
                    while ((len = zis.read(buffer)) > 0) {
                        fos.write(buffer, 0, len);
                    }
                    fos.close();
                }
                zipEntry = zis.getNextEntry();
            }

            zis.closeEntry();
            zis.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // Based on tutorial from https://www.baeldung.com/java-compress-and-uncompress
    public static File newFile(File destinationDir, ZipEntry zipEntry) {
        File destFile = new File(destinationDir, zipEntry.getName());

        try {
            String destDirPath = destinationDir.getCanonicalPath();
            String destFilePath = destFile.getCanonicalPath();

            if (!destFilePath.startsWith(destDirPath + File.separator)) {
                throw new IOException("Entry is outside of the target dir: " + zipEntry.getName());
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return destFile;
    }

    public Void getZippedFiles(String courseId) {
        //Hard coded id for testing
        downloadCourseZip(testCourseId);
        //return all files in /resources/courses/{courseId} in a List

        return null;
    }
}
