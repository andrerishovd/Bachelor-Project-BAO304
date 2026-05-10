package kristiania.chat.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class AiPodcastService {
    private final RestClient restClient;

    public AiPodcastService (
            @Value("${11labs_API_KEY}") String apiKey,
            @Value("${11labs_BASE_URL}") String baseUrl
    ) {

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException("11labs_API_KEY is not set.");
        }
        if (baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalStateException("BASE_URL is not set.");
        }

        this.restClient = RestClient.builder()
            .baseUrl(baseUrl)
            .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

}
