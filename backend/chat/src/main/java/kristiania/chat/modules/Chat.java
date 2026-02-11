package kristiania.chat.modules;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long id;

    @Column(name = "title", length = 100)
    private String title;

    @Column(name = "user_id", length = 100)
    private String userId;

    @OneToMany(mappedBy = "chat")
    List<Message> messageList;
}
