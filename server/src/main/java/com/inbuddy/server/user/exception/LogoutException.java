package com.inbuddy.server.user.exception;

import org.springframework.security.core.AuthenticationException;

public class LogoutException extends AuthenticationException {

    public LogoutException() {
        super(ExceptionMessage.LOGOUT_FAILED.getMessage());
    }

    public LogoutException(String msg) {
        super(msg);
    }

    public LogoutException(String msg, Throwable cause) {
        super(msg, cause);
    }

}
