package com.inbuddy.server.user.info;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OAuth2Provider {
    DEFAULT("default"),
    NAVER("naver"),
    KAKAO("kakao");

    private final String registrationId;
}
