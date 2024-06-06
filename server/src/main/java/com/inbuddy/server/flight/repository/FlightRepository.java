package com.inbuddy.server.flight.repository;

import com.inbuddy.server.flight.entity.FlightInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<FlightInfo, Integer> {
    FlightInfo findByJourney_JourneyId(int journeyId);
    boolean existsByJourneyJourneyId(int journeyId);
}
