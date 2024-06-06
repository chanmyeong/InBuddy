package com.inbuddy.server.user.config;


import com.inbuddy.server.user.handler.CustomAccessDeniedHandler;
import com.inbuddy.server.user.handler.CustomAuthenticationEntryPoint;
import com.inbuddy.server.user.handler.CustomLogoutHandler;
import com.inbuddy.server.user.handler.CustomLogoutSuccessHandler;
import com.inbuddy.server.user.handler.OAuth2AuthenticationFailureHandler;
import com.inbuddy.server.user.handler.OAuth2AuthenticationSuccessHandler;
import com.inbuddy.server.user.jwt.JwtAuthorizationFilter;
import com.inbuddy.server.user.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.inbuddy.server.user.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final CustomLogoutHandler customLogoutHandler;
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    private final OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .oauth2Login(oAuth2LoginConfigurer -> oAuth2LoginConfigurer
                        .authorizationEndpoint(authorization -> authorization
                                .baseUri("/api/oauth2/authorization")
                                .authorizationRequestRepository(
                                        httpCookieOAuth2AuthorizationRequestRepository))
                        .userInfoEndpoint(config -> config.userService(customOAuth2UserService))
                        .redirectionEndpoint(
                                redirectionEndpointConfig -> redirectionEndpointConfig.baseUri(
                                        "/api/login/oauth2/code/*"))
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(oAuth2AuthenticationFailureHandler)
                ).logout(logoutConfigurer -> logoutConfigurer
                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout", "POST"))
                        .addLogoutHandler(customLogoutHandler)
                        .logoutSuccessHandler(customLogoutSuccessHandler)
                        .deleteCookies("JSESSIONID", "access_token", "refresh_token")
                        .invalidateHttpSession(true)
                        .clearAuthentication(true))
                .exceptionHandling(exceptionHandlingConfigurer -> exceptionHandlingConfigurer
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                        .accessDeniedHandler(customAccessDeniedHandler)
                );
        http.addFilterBefore(jwtAuthorizationFilter, LogoutFilter.class);

        return http.build();
    }

}