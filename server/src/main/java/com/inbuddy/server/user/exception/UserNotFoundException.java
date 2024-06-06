package com.inbuddy.server.user.exception;

import org.springframework.dao.DataAccessException;

public class UserNotFoundException extends DataAccessException {


    public UserNotFoundException() {
        super(ExceptionMessage.USER_NOT_FOUND.getMessage());
    }

    public UserNotFoundException(String msg) {
        super(msg);
    }

    public UserNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
