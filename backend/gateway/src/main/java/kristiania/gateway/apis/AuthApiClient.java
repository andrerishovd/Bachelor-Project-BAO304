package kristiania.gateway.apis;

import kristiania.gateway.apis.constants.EndpointConstants;
import kristiania.gateway.apis.responses.AuthResponse;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;
import reactor.core.publisher.Mono;

public interface AuthApiClient {
    @PostExchange(
            value = EndpointConstants.OAUTH2_TOKEN,
            contentType = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    Mono<AuthResponse> authenticate(
            @PathVariable final String tenantId, @RequestBody final MultiValueMap<String, String> authRequest
    );

    @PostExchange(
            value = EndpointConstants.OAUTH2_TOKEN,
            contentType = MediaType.APPLICATION_FORM_URLENCODED_VALUE
    )
    Mono<AuthResponse> refreshToken(
            @PathVariable final String tenantId, @RequestBody final MultiValueMap<String, String> refreshRequest
    );

}
