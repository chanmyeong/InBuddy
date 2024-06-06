package com.inbuddy.server.tasklist.controller;

import com.inbuddy.server.global.message.Message;
import com.inbuddy.server.tasklist.entity.Task;
import com.inbuddy.server.tasklist.service.TasklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/journeys/{journey_id}/tasklist")
public class tasklistController {

    private final TasklistService tasklistService;

    @GetMapping
    public ResponseEntity<Object> readTasklist(@PathVariable("journey_id") int jourenyId){
        try{
            List<Task> taskList = tasklistService.readTasklist(jourenyId);
            if(taskList.isEmpty()){
                Message message = new Message("404", "Task 목록이 비어 있습니다.");
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            }else {
                Message message = new Message("200", "Task 목록을 가져오기 성공", taskList);
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        }catch (Exception e){
            Message message = new Message("500", "서버 오류로 인해 Task 목록을 가져올 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{task_id}/check")
    public ResponseEntity<Object> checkTask(@PathVariable("task_id") int taskId){
        try{
            tasklistService.checkTask(taskId);
            Message message = new Message("200", "Task ID " + taskId + "가 성공적으로 처리되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception e){
            Message message = new Message("500", "Task ID " + taskId + " 처리 중 오류가 발생했습니다.");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }
}
