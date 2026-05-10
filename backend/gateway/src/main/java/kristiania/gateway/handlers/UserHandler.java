package kristiania.gateway.handlers;

import kristiania.gateway.transferobjects.UserTO;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import java.util.List;
import java.util.Random;
import java.util.UUID;

import reactor.core.publisher.Mono;

@Component
public class UserHandler {
    private static final List<String> NAMES = List.of(
            "John Doe", "Jane Doe", "Alice", "Bob"
    );

    public static String getRandomName() {
        return NAMES.get(new Random().nextInt(NAMES.size()));
    }

    public Mono<ServerResponse> randomUser(final ServerRequest serverRequest) {
        return ServerResponse.ok().bodyValue(new UserTO(UUID.randomUUID().toString(), getRandomName()));
    }

}
