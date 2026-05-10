package kristiania.gateway.utils;

import kristiania.gateway.apis.constants.AzureAdConstants;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

public class AzureAdUtils {

    private AzureAdUtils() {
    }

    //Create a request to authenticate with azure ad
    //@param clientSecret The secret key associated with the azure client
    //@param username     The username of the user
    //@param password     The password of the user
    //@return The request to authenticate with azure ad
    public static MultiValueMap<String, String> createAuthRequest(
        final String clientSecret,
        final String clientId,
        final String username,
        final String password) {
            final MultiValueMap<String, String> request = new LinkedMultiValueMap<>();
            request.put(AzureAdConstants.GRANT_TYPE, List.of("password"));
            request.put(AzureAdConstants.CLIENT_ID, List.of(clientId));
            request.put(AzureAdConstants.CLIENT_SECRET, List.of(clientSecret));
            request.put(AzureAdConstants.USERNAME, List.of(username));
            request.put(AzureAdConstants.PASSWORD, List.of(password));
            request.put(AzureAdConstants.SCOPE, List.of("openid profile email offline_access"));

        return request;
    }

     //Create a request to refresh the access token
     //@param clientSecret The secret key associated with the azure client
     //@param clientId     The client id of the azure client
     //@param refreshToken The refresh token
     //@return The request to refresh the access token
    public static MultiValueMap<String, String> createRefreshTokenRequest(
        final String clientSecret,
        final String clientId, final String refreshToken
    ) {
        final MultiValueMap<String, String> request = new LinkedMultiValueMap<>();
        request.put(AzureAdConstants.CLIENT_ID, List.of(clientId));
        request.put(AzureAdConstants.GRANT_TYPE, List.of(AzureAdConstants.REFRESH_TOKEN));
        request.put(AzureAdConstants.SCOPE, List.of("openid profile email offline_access"));
        request.put(AzureAdConstants.CLIENT_SECRET, List.of(clientSecret));
        request.put(AzureAdConstants.REFRESH_TOKEN, List.of(refreshToken));

        return request;
    }
}
