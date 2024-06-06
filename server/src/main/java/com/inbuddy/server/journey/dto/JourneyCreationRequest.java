package com.inbuddy.server.journey.dto;

import lombok.Data;

import java.util.Date;

@Data
public class JourneyCreationRequest{
    private int userId;
    private String journeyName;
    private String flightCode;
    private boolean journeyDone;
    private Date journeyCreationDate;
    private Date journeyModificationDate;
}