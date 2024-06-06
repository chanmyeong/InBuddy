package com.inbuddy.server.tasklist.service;

import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import com.inbuddy.server.tasklist.entity.Task;
import com.inbuddy.server.tasklist.repository.TasklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TasklistService {

    private final JourneyRepository journeyRepository;
    private final TasklistRepository tasklistRepository;

    @Transactional
    public void createTasklist(int journeyId, String taskName) {
        Journey journey = journeyRepository.findByJourneyId(journeyId);
        Task task = Task.crateTasklist(journey, taskName);
        tasklistRepository.save(task);
    }

    @Transactional
    public void checkTask(int taskId) {
        Task task = tasklistRepository.findById(taskId).orElseThrow(() -> new IllegalArgumentException("해야 할 일이 존재하지 않습니다."));
        task.checkTask();
        tasklistRepository.save(task);
    }

    @Transactional
    public List<Task> readTasklist(int journeyId){
        return tasklistRepository.findByJourney_JourneyId(journeyId);
    }
}
