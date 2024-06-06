package com.inbuddy.server.journey.service;

import com.inbuddy.server.itemlist.service.ItemService;
import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import com.inbuddy.server.tasklist.service.TasklistService;
import com.inbuddy.server.user.entity.User;
import com.inbuddy.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class JourneyService {

    private final JourneyRepository journeyRepository;
    private final UserRepository userRepository;
    private final ItemService itemService;
    private final TasklistService tasklistService;

    public List<Journey> getJourneysByUserId(int userId) {
        return journeyRepository.findByUserUserId(userId);
    }
    @Transactional
    public void createJourney(int userId, String journeyName){
        User user = userRepository.findByUserId(userId);
        Journey journey = Journey.createJourney(user,journeyName);
        journeyRepository.save(journey);

        itemService.createItem(journey.getJourneyId(),"여권");
        itemService.createItem(journey.getJourneyId(),"지갑");

        tasklistService.createTasklist(journey.getJourneyId(), "여권챙김?");
        tasklistService.createTasklist(journey.getJourneyId(), "탑승수속");
        tasklistService.createTasklist(journey.getJourneyId(), "환전완료");
        tasklistService.createTasklist(journey.getJourneyId(), "로밍신청");

    }

    @Transactional
    public void modify(int userId, String journeyName) throws ChangeSetPersister.NotFoundException {
        Optional<Journey> journey = journeyRepository.findById(userId);
        if(journey.isPresent()){
            journey.get().updateJourney(journeyName);
        }else{
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    // 이 부분 Exception 직접 만들어서 사용 할지 말지?
    public Journey findById(int id) {
        Optional<Journey> optionalJourney = journeyRepository.findById(id);
        if (optionalJourney.isPresent()) {
            return optionalJourney.get();
        } else {
            throw new NoSuchElementException("해당 ID에 대한 여정을 찾을 수 없습니다.");
        }
    }

    @Transactional
    public void updateJourneyDoneStatus() {
        journeyRepository.updateJourneyDoneStatus();
    }

}