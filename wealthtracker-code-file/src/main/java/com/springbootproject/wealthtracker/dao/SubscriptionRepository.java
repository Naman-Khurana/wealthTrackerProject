package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription,Integer> {
    Optional<Subscription> findTopByAccountHolderIdOrderByStartDateDesc(int userId);
}
