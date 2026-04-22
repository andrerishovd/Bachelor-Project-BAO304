package kristiania.gateway.apis.responses;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AuthResponse(
    @JsonProperty("access_token") String accessToken,
    @JsonProperty("token_type") String tokenType,
    @JsonProperty("refresh_token") String refreshToken,
    @JsonProperty("expires_in") int exipresIn,
    @JsonProperty("scope") String scope,
    @JsonProperty("id_token") String idToken

) {
}
