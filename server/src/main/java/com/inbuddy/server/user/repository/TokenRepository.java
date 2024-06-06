package com.inbuddy.server.user.repository;

import com.inbuddy.server.user.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<RefreshToken, String> {

}
