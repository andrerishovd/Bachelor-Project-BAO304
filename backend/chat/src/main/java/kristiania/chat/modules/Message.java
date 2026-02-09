package kristiania.chat.modules;

import jakarta.persistence.*;
import kristiania.chat.enums.SenderType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;
    private String body;
    private Date date;
    private Time time;

    private SenderType senderType;
    private String senderId;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;
}
