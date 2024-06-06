package com.inbuddy.server.user.service;

import com.inbuddy.server.user.dto.UserProfile;
import com.inbuddy.server.user.entity.User;
import com.inbuddy.server.user.exception.UserNotFoundException;
import com.inbuddy.server.user.info.OAuth2UserInfo;
import com.inbuddy.server.user.repository.UserRepository;
import com.inbuddy.server.user.utils.AuthenticationUtils;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void saveUserIfNotExists(OAuth2UserInfo userInfo) {
        Optional<User> findUser = userRepository.findByProviderId(userInfo.getProviderId());

        if (findUser.isEmpty()) {

            User user = User.builder().email(userInfo.getEmail()).nickname(userInfo.getNickname())
                    .providerId(userInfo.getProviderId())
                    .providerType(userInfo.getProviderType().toString()).build();
            saveUser(user);
        }

    }


    public UserProfile findUserByProviderId(String providerId) {
        User user = userRepository.findByProviderId(providerId)
                .orElseThrow(UserNotFoundException::new);

        return UserProfile.builder().email(user.getEmail()).nickname(user.getNickname()).build();
    }

    public UserProfile findCurrentUser() {
        return findUserByProviderId(AuthenticationUtils.getCurrentProviderId());
    }

    // 이예진 추가 부분이요~
    public User findByUserId(int userId){
        return userRepository.findByUserId(userId);
    }

    public User findUserInfoByProviderId(String providerId){
        System.out.println(111111111);
        return userRepository.findByProviderId(providerId)
                .orElseThrow(UserNotFoundException::new);
    }

    public User findCurrentUserInfo(){
        System.out.println(111111);
        return findUserInfoByProviderId(AuthenticationUtils.getCurrentProviderId());
    }
}
