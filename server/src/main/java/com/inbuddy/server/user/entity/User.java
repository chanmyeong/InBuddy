package com.inbuddy.server.user.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.inbuddy.server.journey.entity.Journey;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "user_info")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int userId;

    private String email;
    private String nickname;

    @Column(name = "provider_id")
    private String providerId;

    @Column(name = "provider_type")
    private String providerType;

    @Column(name = "join_date", updatable = false, nullable = false)
    @CreationTimestamp
    private LocalDateTime join_date;

    // 유저와 여정은 1:N관계
    @JsonBackReference
    @OneToMany(mappedBy = "user")
    private List<Journey> journeys;
}
