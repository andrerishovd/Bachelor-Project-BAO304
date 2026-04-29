package kristiania.chat.modules;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultipartFileUploadResponse {
    private String fileName;
    private String fileType;
    private Long fileSize;
}
