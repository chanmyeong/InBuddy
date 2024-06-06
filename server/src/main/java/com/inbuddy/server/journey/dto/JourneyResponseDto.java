package com.inbuddy.server.journey.dto;//package com.inbuddy.server.journey.dto;
//
//import com.inbuddy.server.journey.entity.Journey;
//import com.inbuddy.server.users.entity.Users;
//import lombok.Getter;
//
//import java.util.Date;
//
//@Getter
//public class JourneyResponseDto {
//    private int journeyId;
//    private Users users;
//    private String journeyName;
//    private String flightCode;
//    private boolean journeyDone;
//    private Date journeyCreationDate;
//    private Date journeyModificationDate;
//
//    public JourneyResponseDto(Journey entity){
//        this.journeyId = entity.getJourneyId();
//        this.users = entity.getUsers();
//        this.journeyName = entity.getJourneyName();
//        this.flightCode = entity.getFlightCode();
//        // isJourneyDone이라고 자동으로 롬복이 지정함
//        this.journeyDone = entity.isJourneyDone();
//        this.journeyCreationDate = entity.getJourneyCreationDate();
//        this.journeyModificationDate = entity.getJourneyModificationDate();
//    }
//}
