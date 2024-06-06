package com.inbuddy.server.user.info;

import java.util.Map;

public interface OAuth2UserInfo {

    OAuth2Provider getProviderType();

    Map<String, Object> getAttributes();

    String getAccessToken();

    String getProviderId();

    String getEmail();

    String getNickname();
}