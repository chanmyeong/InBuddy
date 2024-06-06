package com.inbuddy.server.user.exception;

import org.springframework.dao.DataAccessException;

public class InvalidTokenException extends DataAccessException {


    public InvalidTokenException() {
        super(ExceptionMessage.TOKEN_INVALID.getMessage());
    }

    public InvalidTokenException(String msg) {
        super(msg);
    }

    public InvalidTokenException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
