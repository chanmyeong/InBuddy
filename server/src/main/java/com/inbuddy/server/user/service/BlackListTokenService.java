package com.inbuddy.server.user.service;

import jakarta.transaction.Transactional;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlackListTokenService {

    public static final String BLACKLIST_ACCESS_TOKEN_PREFIX = "blacklist:access_token";
    private final RedisTemplate<String, String> redisTemplate;

    private String buildBlacklistAccessTokenKey(String accessToken) {
        return BLACKLIST_ACCESS_TOKEN_PREFIX + ":" + accessToken;
    }


    @Transactional
    public void saveAccessTokenToRedisBlacklist(String accessToken, long expireTime) {

        String key = buildBlacklistAccessTokenKey(accessToken);

        redisTemplate.opsForValue().set(key, "blacklist", Duration.ofSeconds(expireTime));
    }

    @Transactional
    public boolean findAccessTokenInBlackList(String accessToken) {
        String key = buildBlacklistAccessTokenKey(accessToken);
        Boolean exists = redisTemplate.hasKey(key);
        return Boolean.TRUE.equals(exists);
    }

}
