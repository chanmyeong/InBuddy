package com.inbuddy.server.user.exception;

import org.springframework.security.core.AuthenticationException;

public class NotAuthenticatedException extends AuthenticationException {

    public NotAuthenticatedException() {
        super(ExceptionMessage.NOT_AUTHENTICATED.getMessage());
    }

    public NotAuthenticatedException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public NotAuthenticatedException(String msg) {
        super(msg);
    }
}
