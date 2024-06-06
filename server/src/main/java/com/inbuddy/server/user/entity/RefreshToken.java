package com.inbuddy.server.user.entity;


import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Builder
@RedisHash(value = "refreshToken")
public class RefreshToken {

    @Id
    @Indexed
    private final String providerId;
    private final String token;

    @Builder
    public RefreshToken(String providerId, String token) {
        this.providerId = providerId;
        this.token = token;
    }
}
