package com.inbuddy.server.user.exception;

import org.springframework.security.core.AuthenticationException;

public class OAuth2AuthenticationPrepareException extends AuthenticationException {

    public OAuth2AuthenticationPrepareException(String msg) {
        super(msg);
    }

    public OAuth2AuthenticationPrepareException(String msg, Throwable cause) {
        super(msg, cause);
    }

}
