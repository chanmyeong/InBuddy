package com.inbuddy.server.global.message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Message {
    private String status;
    private String message;
    private Object data;

    public Message(String status, String message) {
        this.status = status;
        this.message = message;
    }
}
