package com.inbuddy.server.itemlist.repository;

import com.inbuddy.server.itemlist.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemlistRepository extends JpaRepository<Item, Integer> {
    List<Item> findByJourney_JourneyId(int journeyId);
}
