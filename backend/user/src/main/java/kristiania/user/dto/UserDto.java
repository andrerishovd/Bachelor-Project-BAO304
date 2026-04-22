package kristiania.user.dto;

import lombok.Builder;

@Builder
public record UserDto (String id, String oid, String email){
}
