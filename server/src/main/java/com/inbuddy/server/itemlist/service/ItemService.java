package com.inbuddy.server.itemlist.service;

import com.inbuddy.server.itemlist.entity.Item;
import com.inbuddy.server.itemlist.repository.ItemlistRepository;
import com.inbuddy.server.journey.entity.Journey;
import com.inbuddy.server.journey.repository.JourneyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ItemService {
    // 아이템 리스트 해야하는 거
    // 1. 생성 2. 수정 3. 삭제 4. 체크
    private final JourneyRepository journeyRepository;
    private final ItemlistRepository itemlistRepository;

    @Transactional
    public List<Item> readItemlist(int journeyId) {
        return itemlistRepository.findByJourney_JourneyId(journeyId);
    }


    @Transactional
    public void createItem(int journeyId, String itemName) {
        Journey journey = journeyRepository.findByJourneyId(journeyId);
        Item item = Item.createItem(journey, itemName);
        itemlistRepository.save(item);
    }

    @Transactional
    public void itemCheck(int itemId) {
        Item item = itemlistRepository.findById(itemId).orElseThrow(() -> new IllegalArgumentException("아이템이 존재하지 않습니다."));
        item.checkItem(); // 체크 표시 반전
        itemlistRepository.save(item); // 변경된 상태로 저장
    }

    @Transactional
    public void deleteItem(int itemId) {
        // 아이템을 찾아서 가져옵니다.
        Item item = itemlistRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아이템을 찾을 수 없습니다. ID: " + itemId));
        // 아이템이 존재하면 삭제합니다.
        itemlistRepository.delete(item);
    }

    // 아이템 하나 생성
    @Transactional
    public void add(int journeyId, String itemName) {
        Journey journey = journeyRepository.findByJourneyId(journeyId);
        Item item = Item.builder()
                .journey(journey)
                .itemName(itemName)
                .build();
        itemlistRepository.save(item);
    }

    @Transactional
    public void modify(int itemId, String itemName) throws ChangeSetPersister.NotFoundException {
        Optional<Item> item = itemlistRepository.findById(itemId);
        if (item.isPresent()){
            item.get().updateItem(itemName);
        }else{
            throw new ChangeSetPersister.NotFoundException();
        }
    }
}

