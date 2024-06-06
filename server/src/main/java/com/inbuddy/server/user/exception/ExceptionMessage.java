package com.inbuddy.server.user.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionMessage {
    USER_NOT_FOUND("User Not Found"),
    NOT_AUTHENTICATED("Not Authenticated"),
    LOGOUT_FAILED("Logout Failed"),
    ACCESS_TOKEN_EXPIRED("Access Token Expired"),
    REFRESH_TOKEN_EXPIRED("Refresh Token Expired"),
    ACCESS_DENIED("Access Denied"),
    DATA_NOT_FOUND("Data Not Found"),
    TOKEN_INVALID("Invalid Token");
    private final String message;
}
