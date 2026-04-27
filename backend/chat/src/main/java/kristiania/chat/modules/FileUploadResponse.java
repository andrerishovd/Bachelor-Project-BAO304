package kristiania.chat.modules;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadResponse {
    String fileName;
    String fileType;
    Long fileSize;
}
