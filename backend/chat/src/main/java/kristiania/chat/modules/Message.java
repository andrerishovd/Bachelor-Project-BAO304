package kristiania.chat.modules;

import jakarta.persistence.*;
import kristiania.chat.enums.SenderType;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @Column(name = "body", length = 16000)
    private String body;

    @Column(name = "local_date_time")
    private LocalDateTime localDateTime;

    @Column(name = "sender_type")
    private SenderType senderType;
    @Column(name = "sender_id")
    private String senderId;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;
}
