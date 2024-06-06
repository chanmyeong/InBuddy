package com.inbuddy.server.journey.repository;

import com.inbuddy.server.journey.entity.Journey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface JourneyRepository extends JpaRepository<Journey,Integer> {
    List<Journey> findByUserUserId(int userId);
    Journey findByJourneyId(int journeyId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE journey_collection AS c JOIN journey_flight AS j ON c.journey_id = j.journey_id SET c.journey_done = TRUE WHERE j.departure_date < CURDATE()", nativeQuery = true)
    void updateJourneyDoneStatus();
}