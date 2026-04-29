package kristiania.settings.modules;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import kristiania.settings.enums.Theme;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Settings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "settings_id")
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(name = "theme")
    private Theme theme;
    @Column(name = "font_size")
    private String fontSize;
    @Column(name = "language")
    private String language;
    @Column(name = "user_id")
    private Long userId;
}
