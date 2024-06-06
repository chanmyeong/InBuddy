package com.inbuddy.server.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class UserProfile {

    private String email;
    private String nickname;
}
