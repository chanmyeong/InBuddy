package com.inbuddy.server.user.jwt;

import com.inbuddy.server.user.exception.InvalidTokenException;
import com.inbuddy.server.user.service.BlackListTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final TokenProvider tokenProvider;
    private final BlackListTokenService blackListTokenService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String token = tokenProvider.resolveToken(request);

        try {
            if (StringUtils.hasText(token)) {
                if (!blackListTokenService.findAccessTokenInBlackList(token)
                        && tokenProvider.validateToken(token)) {

                    Authentication authentication = tokenProvider.getAuthentication(token);
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    throw new InvalidTokenException();
                }
            }
        } catch (InvalidTokenException exception) {
            response.sendError(401, exception.getLocalizedMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }
}
