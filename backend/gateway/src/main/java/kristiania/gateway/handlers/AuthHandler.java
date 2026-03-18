package kristiania.gateway.handlers;

import kristiania.gateway.apis.requests.AuthRequest;
import kristiania.gateway.apis.requests.RefreshTokenRequest;
import kristiania.gateway.utils.AzureAdUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import kristiania.gateway.apis.AuthApiClient;
import kristiania.gateway.configuraiton.properties.AzureActiveDirectoryProperties;
import reactor.core.publisher.Mono;

@Component
public class AuthHandler {
    private final AuthApiClient authApiClient;
    private final AzureActiveDirectoryProperties activeDirectoryProperties;

    public AuthHandler(final AuthApiClient authApiClient,
                       final AzureActiveDirectoryProperties activeDirectoryProperties) {
        this.authApiClient = authApiClient;
        this.activeDirectoryProperties = activeDirectoryProperties;
    }

    /**
     * Authenticate user with Azure AD
     *
     * @param serverRequest Server request with authentication request
     * @return Server response with authentication response
     */
    public Mono<ServerResponse> authenticate(final ServerRequest serverRequest) {

        return serverRequest.bodyToMono(AuthRequest.class)
                .flatMap(body -> {
                    final String username = body.username();
                    final String password = body.password();

                    return this.authApiClient.authenticate(
                            this.activeDirectoryProperties.getTenantId(),
                            AzureAdUtils.createAuthRequest(
                                    this.activeDirectoryProperties.getClientSecret(), this.activeDirectoryProperties.getClientId(),
                                    username, password
                            )
                    );
                }).flatMap(response -> {
                    return ServerResponse.ok().bodyValue(response);
                });
    }

    /**
     * Refresh user token with Azure AD
     *
     * @param serverRequest Server request with refresh token request
     * @return Server response with refresh token response
     */
    public Mono<ServerResponse> refreshToken(final ServerRequest serverRequest) {

        return serverRequest.bodyToMono(RefreshTokenRequest.class)
                .flatMap(body -> {
                    final String refreshToken = body.refreshToken();

                    return this.authApiClient.refreshToken(
                            this.activeDirectoryProperties.getTenantId(),
                            AzureAdUtils.createRefreshTokenRequest(
                                    this.activeDirectoryProperties.getClientSecret(), this.activeDirectoryProperties.getClientId(),
                                    refreshToken
                            )
                    );
                }).flatMap(response -> {
                    return ServerResponse.ok().bodyValue(response);
                });
    }


}
