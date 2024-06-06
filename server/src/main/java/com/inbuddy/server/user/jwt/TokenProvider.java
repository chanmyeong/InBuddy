package com.inbuddy.server.user.jwt;

import com.inbuddy.server.user.exception.NotAuthenticatedException;
import com.inbuddy.server.user.info.DefaultOAuth2UserInfo;
import com.inbuddy.server.user.info.OAuth2Provider;
import com.inbuddy.server.user.info.OAuth2UserPrincipal;
import com.inbuddy.server.user.utils.AuthenticationUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenProvider {

    public static final String ACCESS_TOKEN_NAME = "access_token";
    public static final String REFRESH_TOKEN_NAME = "refresh_token";
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final long ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000L * 60L * 30L; // 30min
    public static final int ACCESS_TOKEN_EXPIRE_TIME_IN_SECONDS = 60 * 30; // 30min
    public static final long REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS =
            1000L * 60L * 60L * 24L * 14L; // 2weeks
    public static final int REFRESH_TOKEN_EXPIRE_TIME_IN_SECONDS = 60 * 60 * 24 * 14;
    public static final String ISSUER = "inbuddy";


    @Value("${jwt.secret}")
    private String secret;

    private SecretKey key;

    @PostConstruct
    public void init() {
        // 시크릿 값을 복호화(decode) 하여 키 변수에 할당
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.key = Jwts.SIG.HS512.key().build();
    }

    public String createAccessToken() {
        return this.createAccessToken(AuthenticationUtils.getCurrentProviderId());
    }

    public String createAccessToken(Authentication authentication) {
        String providerId = Optional.ofNullable(
                        ((OAuth2UserPrincipal) (authentication.getPrincipal())).getUserInfo()
                                .getProviderId())
                .orElseThrow(
                        NotAuthenticatedException::new);
        return this.createAccessToken(providerId);
    }

    public String createAccessToken(String providerId) {

        Date date = new Date();
        Date expiredAt = new Date(date.getTime() + ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS);

        return Jwts.builder()
                .claim("type", ACCESS_TOKEN_NAME)
                .issuer(ISSUER)
                .subject(providerId)
                .expiration(expiredAt)
                .notBefore(date)
                .issuedAt(date)
                .signWith(key)
                .compact();
    }


    public String createRefreshToken() {
        return this.createRefreshToken(AuthenticationUtils.getCurrentProviderId());
    }

    public String createRefreshToken(Authentication authentication) {
        String providerId = Optional.ofNullable(
                        ((OAuth2UserPrincipal) (authentication.getPrincipal())).getUserInfo()
                                .getProviderId())
                .orElseThrow(
                        NotAuthenticatedException::new);
        return this.createRefreshToken(providerId);
    }

    public String createRefreshToken(String providerId) {
        Date date = new Date();
        Date expiredAt = new Date(date.getTime() + REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS);

        return Jwts.builder()
                .claim("type", REFRESH_TOKEN_NAME)
                .issuer(ISSUER)
                .subject(providerId)
                .expiration(expiredAt)
                .notBefore(date)
                .issuedAt(date)
                .signWith(key)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);

            return true;
        } catch (UnsupportedJwtException | MalformedJwtException exception) {
            log.error("JWT is not valid");
        } catch (SignatureException exception) {
            log.error("JWT signature validation fails");
        } catch (ExpiredJwtException exception) {
            log.error("JWT is expired");
        } catch (IllegalArgumentException exception) {
            log.error("JWT is null or empty or only whitespace");
        } catch (Exception exception) {
            log.error("JWT validation fails", exception);
        }

        return false;
    }

    public String resolveToken(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
            return token.substring(BEARER_PREFIX.length());
        }
        return null;
    }

    public Authentication getAuthentication(String token) {
        Claims payload = Jwts.parser().verifyWith(key).build().parseSignedClaims(token)
                .getPayload();

        OAuth2User user = new OAuth2UserPrincipal(new DefaultOAuth2UserInfo(payload.getSubject()));
        return new OAuth2AuthenticationToken(user, Collections.emptyList(),
                OAuth2Provider.DEFAULT.getRegistrationId());

    }

    public long getTokenExpireTime(String token) {
        Claims payload = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        long exp = payload.getExpiration().getTime();
        long now = System.currentTimeMillis();

        return (exp - now) / 1000;
    }
}
