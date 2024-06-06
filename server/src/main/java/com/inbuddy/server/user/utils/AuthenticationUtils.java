package com.inbuddy.server.user.utils;


import com.inbuddy.server.user.exception.NotAuthenticatedException;
import com.inbuddy.server.user.info.OAuth2UserPrincipal;
import java.util.Optional;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthenticationUtils {

    public static String getCurrentProviderId() {
        System.out.println(22222);
        return Optional.ofNullable(
                        Optional.ofNullable(
                                        SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                                .filter(OAuth2UserPrincipal.class::isInstance)
                                .map(OAuth2UserPrincipal.class::cast)
                                .orElseThrow(NotAuthenticatedException::new)
                                .getUserInfo().getProviderId())
                .orElseThrow(NotAuthenticatedException::new);
    }
}
