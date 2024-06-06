package com.inbuddy.server.journey.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inbuddy.server.flight.entity.FlightInfo;
import com.inbuddy.server.itemlist.entity.Item;
import com.inbuddy.server.tasklist.entity.Task;
import com.inbuddy.server.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor // 생성자 추가
@NoArgsConstructor
@Entity
@Table(name= "journey_collection")
public class Journey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "journey_id")
    private int journeyId;

    // 유저와 여정은 1:N관계
    @JsonManagedReference
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @Column(name = "journey_name", nullable = false, length = 255)
    private String journeyName;

    @Column(name = "journey_done", nullable = false)
    private boolean journeyDone;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "journey_creation_date", nullable = false)
    private Date journeyCreationDate;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "journey_modification_date", nullable = false)
    private Date journeyModificationDate;


    @JsonBackReference
    @OneToMany(mappedBy = "journey", cascade = CascadeType.REMOVE)
    private List<Task> taskLists;

    @JsonBackReference
    @OneToMany(mappedBy = "journey", cascade = CascadeType.REMOVE)
    private List<Item> item;

    @JsonBackReference
    @OneToMany(mappedBy = "journey",cascade = CascadeType.REMOVE)
    private List<FlightInfo> flightInfo;

    @Builder
    private Journey(User user, String journeyName) {
        this.user = user;
        this.journeyName = journeyName;
        this.journeyDone = false;
    }
    public static Journey createJourney(User user, String journeyName){
        return new Journey(user,journeyName);
    }

    public void updateJourney(String journeyName){
        this.journeyName = journeyName;
        this.journeyModificationDate = new Date();
    }
}
