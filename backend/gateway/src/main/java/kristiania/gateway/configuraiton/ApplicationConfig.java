package kristiania.gateway.configuraiton;

import kristiania.gateway.configuraiton.properties.AzureActiveDirectoryProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.server.resource.web.reactive.function.client.ServletBearerExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

// https://gitlab.com/markozivkovic95/azure-ad-auth-demo/-/blob/main/src/main/java/com/demo/azure_ad_auth_demo/configurations/ApplicationConfiguration.java?ref_type=heads

@Configuration
public class ApplicationConfig {
    private final AzureActiveDirectoryProperties azureActiveDirectoryProperties;

    public ApplicationConfig(final AzureActiveDirectoryProperties azureActiveDirectoryProperties) {
        this.azureActiveDirectoryProperties = azureActiveDirectoryProperties;
    }

    @Bean
    WebClient webClient() {

        final ServletBearerExchangeFilterFunction bearer = new ServletBearerExchangeFilterFunction();

        return WebClient.builder()
                .baseUrl(this.azureActiveDirectoryProperties.getHost())
                .filter(bearer)
                .build();
    }

    @Bean
    HttpServiceProxyFactory httpServiceProxyFactory(final WebClient webClient) {

        return HttpServiceProxyFactory.builderFor(WebClientAdapter.create(webClient))
                .build();
    }

}
