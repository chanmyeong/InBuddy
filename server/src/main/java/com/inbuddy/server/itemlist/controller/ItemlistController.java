package com.inbuddy.server.itemlist.controller;

import com.inbuddy.server.global.message.Message;
import com.inbuddy.server.itemlist.dto.ItemDto;
import com.inbuddy.server.itemlist.entity.Item;
import com.inbuddy.server.itemlist.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name ="Itemlist API", description = "아이템 리스트에 대한 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/journeys/{journey_id}/itemlist")
@CrossOrigin("*")
public class ItemlistController {
    private final ItemService itemService;

    // list create의 경우 Journey가 생성되는 경우 자동으로 되기 때문에 여기엔 별도로 짜진 않는다.

    // READ
    @Operation(summary = "한 여정에 대한 아이템 리스트 다 불러오기", description = "특정 여정에 대한 모든 아이템을 가져오는 API입니다.")
    @Parameter(name = "journey_id", description = "조회할 여정의 ID")
    @GetMapping
    public ResponseEntity<Object> readItemlist(@PathVariable("journey_id") int journeyId) {
        try {
            List<Item> itemList = itemService.readItemlist(journeyId);
            if (itemList.isEmpty()) {
                // 여권은 무조건 있을 거라 아마 비어있을 수 없다.
                Message message = new Message("404", "아이템 목록이 비어 있습니다.");
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            } else {
                Message message = new Message("200", "아이템 목록을 가져오기 성공", itemList);
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        } catch (Exception e) {
            Message message = new Message("500", "아이템 목록 읽기 서버 오류로 인해 아이템 목록을 가져올 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // check

    @Operation(summary = "아이템 체크", description = "특정 아이템을 체크하는 API입니다.")
    @Parameter(name = "item_id", description = "체크할 아이템의 ID")
    @PutMapping("/{item_id}/check")
    public ResponseEntity<Object> checkItem(@PathVariable("item_id") int itemId){
        try {
            itemService.itemCheck(itemId);
            Message message = new Message("200", "아이템 ID " + itemId + "가 성공적으로 처리되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e){
            // 예외 발생 시 실패 메시지와 함께 응답
            Message message = new Message("500", "아이템 ID " + itemId + " 처리 중 오류가 발생했습니다.");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    // delete
    @Operation(summary = "아이템 삭제", description = "특정 아이템을 삭제하는 API입니다.")
    @Parameter(name = "item_id", description = "삭제할 아이템의 ID")
    @DeleteMapping("/{item_id}/delete")
    public ResponseEntity<Object> deleteItem(@PathVariable("item_id") int itemId){
        try {
            itemService.deleteItem(itemId);
            Message message = new Message("200", "아이템 ID " + itemId + "가 성공적으로 삭제되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e){
            // 예외 발생 시 실패 메시지와 함께 응답
            Message message = new Message("500", "아이템 ID " + itemId + " 삭제 중 오류가 발생했습니다.");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
    }

    // create
    @Operation(summary = "아이템 생성", description = "새로운 아이템을 생성하는 API입니다.")
    @PostMapping("/create")
    public ResponseEntity<Object> addItem(@RequestBody ItemDto itemDto){
        try{
            itemService.add(itemDto.getJourneyId(), itemDto.getItemName());
            Message message = new Message("200", itemDto.getItemName()+": 아이템 생성이 성공적으로 완료되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (Exception e){
            Message message = new Message("500", itemDto.getItemName()+": 아이템 생성 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Operation(summary = "아이템 수정", description = "기존 아이템을 수정하는 API입니다.")
    @Parameter(name = "item_id", description = "수정할 아이템의 ID")
    @PutMapping("/{item_id}/modify")
    public ResponseEntity<Object> modifyItem(@PathVariable("item_id") int itemId, @RequestBody ItemDto itemDto){
        try {
            itemService.modify(itemId, itemDto.getItemName());
            Message message = new Message("200", itemDto.getItemName()+": 아이템 생성이 성공적으로 수정되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (ChangeSetPersister.NotFoundException e){
            Message message = new Message("404", itemDto.getItemName()+"아이템 생성이 실패하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }catch (Exception ignored){
            Message message = new Message("500", itemDto.getItemName()+": 아이템 수정 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
