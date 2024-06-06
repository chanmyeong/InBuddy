package com.inbuddy.server.user.exception;

import org.springframework.dao.DataAccessException;

public class DataNotFoundException extends DataAccessException {

    public DataNotFoundException() {
        super(ExceptionMessage.DATA_NOT_FOUND.getMessage());
    }

    public DataNotFoundException(String msg) {
        super(msg);
    }

    public DataNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
