package kristiania.gateway.configuraiton;

import kristiania.gateway.apis.AuthApiClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class ClientApiConfig {
    @Bean
    AuthApiClient authApiClient(final HttpServiceProxyFactory httpServiceProxyFactory) {

        return httpServiceProxyFactory.createClient(AuthApiClient.class);
    }

}
