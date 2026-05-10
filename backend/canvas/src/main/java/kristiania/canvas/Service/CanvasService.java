package kristiania.canvas.Service;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class CanvasService {

    // Zip functions are based on this tutorial: https://www.baeldung.com/java-compress-and-uncompress

    @Value("${COURSE_MATERIAL_PATH:/courseMaterial}")
    String courseMaterialPath;

    public void addFilesToArchive(ZipOutputStream zipOutputStream, String subFolder) throws IOException {
        List<String> filesNames = getFileNames(new File(courseMaterialPath + "/" + subFolder));

        for (String fileName : filesNames) {
            File file = new File(courseMaterialPath + "/" + subFolder + "/" + fileName);
            zipOutputStream.putNextEntry(new ZipEntry(file.getName()));
            FileInputStream fileInputStream = new FileInputStream(file);

            IOUtils.copy(fileInputStream, zipOutputStream);

            fileInputStream.close();
            zipOutputStream.closeEntry();
        }

        zipOutputStream.finish();
        zipOutputStream.flush();
        IOUtils.closeQuietly(zipOutputStream);
    }

    private List<String> getFolderNames(File folder) {
        List<String> folderNameList = Arrays.stream(Objects.requireNonNull(folder.listFiles(File::isDirectory)))
            .map(File::getName)
            .toList();

        return folderNameList;
    }

    private List<String> getFileNames(File folder) {
        List<String> fileNameList = Arrays.stream(Objects.requireNonNull(folder.listFiles(File::isFile)))
            .map(File::getName)
            .toList();

        return fileNameList;
    }

    public List<String> getAllCourses() {
        File coursesFolder = new File(courseMaterialPath);

        return getFolderNames(coursesFolder);
    }
}
