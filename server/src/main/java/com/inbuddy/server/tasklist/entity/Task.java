package com.inbuddy.server.tasklist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inbuddy.server.journey.entity.Journey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Getter
@AllArgsConstructor // 생성자 추가
@NoArgsConstructor
@Entity
@Table(name= "task_list")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private int taskId;

    @JsonManagedReference
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="journey_id",nullable = false)
    private Journey journey;

    @Column(name = "task_name", nullable = false, length = 255)
    private String taskName;

    @Column(name = "task_done", nullable = false)
    private boolean taskDone = false;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "task_modification_date", nullable = false)
    private Date taskModificationDate;

    @Builder
    private Task(Journey journey, String taskName){
        this.journey = journey;
        this.taskName = taskName;
        this.taskDone = false;
    }

    public static Task crateTasklist(Journey journey, String taskName){
        return new Task(journey, taskName);
    }

    // 체크표시했나 안했나
    public void checkTask(){
        this.taskDone = !this.taskDone;
        this.taskModificationDate = new Date();
    }
}
