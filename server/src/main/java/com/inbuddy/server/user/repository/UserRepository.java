package com.inbuddy.server.user.repository;

import com.inbuddy.server.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByProviderId(String providerId);

    User findByUserId(int userId);
}
