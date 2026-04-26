package kristiania.canvas.Controller;

import kristiania.canvas.Service.CanvasService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.List;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api/canvas")
public class CanvasController {

    private final CanvasService canvasService;

    public CanvasController(CanvasService canvasService) {
        this.canvasService = canvasService;
    }

    @GetMapping("/allCourses")
    public ResponseEntity<List<String>> getAllCourses() {
        return ResponseEntity.ok(canvasService.getAllCourses());
    }

    // Zip functions are based on this tutorial: https://www.baeldung.com/java-compress-and-uncompress
    @GetMapping(value = "/courseId/{courseId}/zipArchiveStream", produces = "application/zip")
    public ResponseEntity<StreamingResponseBody> getZipStream(@PathVariable String courseId) {

        return ResponseEntity
                .ok()
                .header("Content-Disposition", "attachment; filename=\""+courseId+".zip\"")
                .body(out -> {
                    ZipOutputStream zipOutputStream = new ZipOutputStream(out);
                    zipOutputStream.setLevel(0);
                    canvasService.addFilesToArchive(zipOutputStream, courseId);
                });
    }
}
