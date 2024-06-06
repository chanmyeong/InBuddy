package com.inbuddy.server.journey.controller;

import com.inbuddy.server.global.message.Message;
import com.inbuddy.server.journey.dto.JourneyCreationRequest;
import com.inbuddy.server.journey.dto.JourneyModifyDto;
import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import com.inbuddy.server.journey.service.JourneyService;
import com.inbuddy.server.user.entity.User;
import com.inbuddy.server.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/journeys")
@Tag(name = "Journey API", description = "여정에 관련된 API")
public class JourneyController {

    private final JourneyRepository journeyRepository;
    private final JourneyService journeyService;
    private final UserService userService;
    @Operation(summary = "여정 목록 조회", description = "현재 사용자의 여정 목록을 조회합니다.")
    @GetMapping()
    public ResponseEntity<Object> getJourneys() {
        User userProfile  = userService.findCurrentUserInfo();
        int userId = userProfile.getUserId();
        try {
            List<Journey> journeyList = journeyRepository.findByUserUserId(userId);
            if (journeyList.isEmpty()) {
                Message message = new Message("200", "여정 목록이 비어있습니다.");
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                Message message = new Message("200", "여정 목록을 가져오기 성공", journeyList);
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        } catch (Exception e) {
            Message message = new Message("500", "서버 오류로 인해 여정 목록을 가져올 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Operation(summary = "여정 삭제", description = "여정을 삭제합니다.")
    @Parameter(name = "journey_id", description = "삭제할 여정의 ID")
    @DeleteMapping("/{journey_id}/delete")
    public ResponseEntity<Object> deleteJourney(@PathVariable("journey_id") int journeyId) {
        try {
            User userProfile  = userService.findCurrentUserInfo();
            int userId = userProfile.getUserId();
            // 해당 사용자의 여정 중에서 journeyId에 해당하는 여정을 찾습니다.
            Optional<Journey> optionalJourney = journeyRepository.findById(journeyId);

            if (optionalJourney.isPresent()) {
                Journey journey = optionalJourney.get();
                // 여정이 해당 사용자의 것인지 확인합니다.
                if (journey.getUser().getUserId() == userId) {
                    // 여정을 삭제합니다.
                    journeyRepository.delete(journey);

                    // 삭제 성공 메시지 반환
                    Message message = new Message("200", "여정을 삭제했습니다.");
                    return new ResponseEntity<>(message, HttpStatus.OK);
                } else {
                    // 해당 사용자의 여정이 아닌 경우 에러 메시지 반환
                    Message message = new Message("403", "해당 여정을 삭제할 권한이 없습니다.");
                    return new ResponseEntity<>(message, HttpStatus.FORBIDDEN);
                }
            } else {
                // 해당 여정이 존재하지 않는 경우 에러 메시지 반환
                Message message = new Message("404", "해당하는 여정을 찾을 수 없습니다.");
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // 서버 오류 발생 시 에러 메시지 반환
            Message message = new Message("500", "서버 오류로 인해 여정을 삭제할 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "여정 생성", description = "새로운 여정을 생성합니다.")
    @PostMapping()
    public ResponseEntity<Object> createJourney(@RequestBody JourneyCreationRequest journeyRequest) {
        try {
            User userProfile  = userService.findCurrentUserInfo();
            int userId = userProfile.getUserId();

            // JourneyService를 사용하여 여정 생성
            journeyService.createJourney(userId, journeyRequest.getJourneyName());
            // 생성된 여정을 반환 (여정 생성 성공 시 반환하는 것이 좋습니다)
            Message message = new Message("200", "여정 생성에 성공했습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            // 여정 생성 실패 시 에러 메시지 반환
            Message message = new Message("500", "여정 생성에 실패했습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "여정 수정", description = "기존 여정을 수정합니다.")
    @Parameter(name = "journey_id", description = "수정할 여정의 ID")
    @PutMapping("/{journey_id}/modify")
    public ResponseEntity<Object> modifyJourney(@PathVariable("journey_id") int journeyId, @RequestBody JourneyModifyDto journeyModifyDto) {
        try {
            journeyService.modify(journeyId, journeyModifyDto.getJourneyName());
            Message message = new Message("200", journeyModifyDto.getJourneyName() + ": 여정 수정이 성공적으로 수정되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            Message message = new Message("500", journeyModifyDto.getJourneyName() + ": 여정 수정 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void updateJourneyStatus() {
        journeyService.updateJourneyDoneStatus();
        System.out.println("매일 자정에 실행되는 작업");
    }
}
