package kristiania.gateway.routers;

import static org.springframework.web.reactive.function.server.RequestPredicates.POST;

import kristiania.gateway.handlers.AuthHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class AuthRouter {
    @Bean
    public RouterFunction<ServerResponse> authRoutes(final AuthHandler authHandler) {

        return RouterFunctions.route(
                POST("/api/v1/authentication"), authHandler::authenticate
        ).andRoute(
                POST("/api/v1/authentication/refresh-token"), authHandler::refreshToken
        );
    }

}
