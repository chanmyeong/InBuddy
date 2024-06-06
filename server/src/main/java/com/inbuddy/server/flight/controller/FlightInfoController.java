package com.inbuddy.server.flight.controller;

import com.inbuddy.server.flight.dto.FlightDto;
import com.inbuddy.server.flight.entity.FlightInfo;
import com.inbuddy.server.flight.service.FlightService;
import com.inbuddy.server.global.message.Message;
import com.inbuddy.server.journey.entity.Journey;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/journeys/{journey_id}/flight")
public class FlightInfoController {
    private final FlightService flightService;

    @GetMapping
    public ResponseEntity<Object> readFlightInfo(@PathVariable("journey_id") int journeyId) {
        try {
            FlightInfo flightInfo = flightService.readFlightInfo(journeyId);
            if (flightInfo == null) {
                Message message = new Message("200", "비행 정보가 비어 있습니다.");
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                Message message = new Message("200", "비행 정보 가져오기 성공", flightInfo);
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        } catch (Exception e) {
            System.out.println(e);
            Message message = new Message("500", "비행 정보 서버 오류로 인해 아이템 목록을 가져올 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createFlightInfo(@PathVariable("journey_id") int journeyId, @RequestBody FlightDto flightDto) {
        try {
            System.out.println(journeyId);
            // 여기서 json안에 journeyId를 담을 건지 url에 있는 journeyid를 가져올건지 결정
            flightService.createFlightInfo(journeyId, flightDto.getFlightCode(), flightDto.getAirline(), flightDto.getDepartureDate());
            Message message = new Message("200", flightDto.getFlightCode() + ": 비행기정보 생성이 성공적으로 완료되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            Message message = new Message("500", flightDto.getFlightCode() + ": 비행기정보 생성 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{journey_flight_id}/modify")
    public ResponseEntity<Object> modifyFlightInfo(@PathVariable("journey_flight_id") int flightId, @RequestBody FlightDto flightDto) {
        try {
            flightService.modifyFlightInfo(flightId, flightDto.getFlightCode(), flightDto.getAirline(), flightDto.getDepartureDate());
            Message message = new Message("200", flightDto.getFlightCode() + ": 아이템 생성이 성공적으로 수정되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (ChangeSetPersister.NotFoundException e) {
            Message message = new Message("404", flightDto.getFlightCode() + "아이템 생성이 실패하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        } catch (Exception ignored) {
            Message message = new Message("500", flightDto.getFlightCode() + ": 아이템 수정 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{journey_flight_id}/delete")
    public ResponseEntity<Object> deleteJourney(@PathVariable("journey_flight_id") int flightId) {
        try {
            flightService.deleteFlightInfo(flightId);
            Message message = new Message("200", "비행 정보 삭제가 성공적으로 완료되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            Message message = new Message("404", "해당 비행 정보를 찾을 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            Message message = new Message("500", "비행 정보 삭제 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{journey_flight_id}/seat")
    public ResponseEntity<Object> updateSeat(@PathVariable("journey_flight_id") int journeyFlightId, @RequestBody FlightDto flightDto){
        try{
            flightService.updateSeat(journeyFlightId,flightDto.getSeat());
            Message message = new Message("200", "좌석 업데이트가 성공적으로 완료되었습니다.");
            return new ResponseEntity<>(message, HttpStatus.OK);
        }catch (ChangeSetPersister.NotFoundException e){
            Message message = new Message("404", journeyFlightId + "좌석 업데이트를 위한 비행정보 찾기 실패하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }catch (Exception e){
            Message message = new Message("500", journeyFlightId + ": 아이템 수정 중 오류가 발생하였습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{journey_flight_id}/seat")
    public ResponseEntity<Object> getSeat(@PathVariable("journey_flight_id") int journeyId) {
        try {
            FlightInfo flightInfo = flightService.readFlightInfo(journeyId);
            if (flightInfo == null) {
                Message message = new Message("200", "비행 정보가 비어 있습니다.");
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else if (flightInfo.getSeat() == null) {
                Message message = new Message("200", "좌석 정보가 비어 있습니다.");
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                Message message = new Message("200", "좌석 정보 가져오기 성공", flightInfo.getSeat());
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        } catch (Exception e) {
            System.out.println(e);
            Message message = new Message("500", "비행 정보 서버 오류로 인해 아이템 목록을 가져올 수 없습니다.");
            return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
