package kristiania.gateway.apis.requests;

public record AuthRequest(
    String username,
    String password
) {

}
