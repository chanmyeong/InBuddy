package com.inbuddy.server.user.info;

import java.util.Map;
import lombok.Getter;

@Getter
public class NaverOAuth2UserInfo implements OAuth2UserInfo {

    private final OAuth2Provider providerType = OAuth2Provider.NAVER;
    private final Map<String, Object> attributes;
    private final String accessToken;
    private final String providerId;
    private final String email;
    private final String nickname;

    public NaverOAuth2UserInfo(String accessToken, Map<String, Object> attributes) {
        this.accessToken = accessToken;

        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        this.attributes = response;

        this.providerId = response.get("id").toString();
        this.email = response.get("email").toString();
        this.nickname = response.get("nickname").toString();

    }
}
