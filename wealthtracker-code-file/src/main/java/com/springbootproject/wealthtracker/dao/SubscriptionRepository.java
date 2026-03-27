package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Integer> {
}
