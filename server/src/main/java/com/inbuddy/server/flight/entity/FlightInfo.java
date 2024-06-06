package com.inbuddy.server.flight.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.inbuddy.server.journey.entity.Journey;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "journey_flight")
public class FlightInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "journey_flight_id")
    private int journeyFlightId;

    @JsonManagedReference
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "journey_id",nullable = false)
    private Journey journey;

    @Column(name = "departure_date", nullable = true, length = 255)
    private LocalDate departureDate;

    @Column(name = "flight_code", nullable = false, length = 255)
    private String flightCode;

    @Column(name = "airline", nullable = false, length = 255)
    private String airline;

    @Column(name = "seat", nullable = true, length = 255)
    private String seat;

    @Builder
    private FlightInfo(Journey journey, String flightCode, String airline, LocalDate departureDate){
        this.journey = journey;
        this.flightCode = flightCode;
        this.airline = airline;
        this.departureDate = departureDate;
    }

    public static FlightInfo createFlightInfo(Journey journey, String flightCode, String airline, LocalDate departureDate){
        return new FlightInfo(journey,flightCode,airline,departureDate);
    }

    public void updateFlightInfo(String flightCode, String airline, LocalDate departureDate){
        this.flightCode = flightCode;
        this.airline = airline;
        this.departureDate = departureDate;
    }

    public void updateSeat(String seat){
        this.seat = seat;
    }

}