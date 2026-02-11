package kristiania.user.modules;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AiAgent extends Participant{
    @Column(name = "name", length = 100)
    private String name;
    @Column(name = "model", length = 100)
    private String model;
    //private String personality;
}
