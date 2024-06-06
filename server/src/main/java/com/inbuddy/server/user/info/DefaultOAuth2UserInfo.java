package com.inbuddy.server.user.info;

import java.util.Map;
import lombok.Getter;
import lombok.NonNull;

@Getter
public class DefaultOAuth2UserInfo implements OAuth2UserInfo {

    private final OAuth2Provider providerType = OAuth2Provider.DEFAULT;
    private final Map<String, Object> attributes;
    private final String accessToken;
    @NonNull
    private final String providerId;
    private final String email;
    private final String nickname;

    public DefaultOAuth2UserInfo(@NonNull String providerId) {
        this.attributes = null;
        this.accessToken = null;
        this.providerId = providerId;
        this.email = null;
        this.nickname = null;
    }
}
