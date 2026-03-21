package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.entity.Subscription;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {
    @Override
    public Subscription findActiveSubscription(Set<Subscription> subscriptionList) {
        return subscriptionList.stream().filter(s -> (s.getEndDate() !=null && !s.getEndDate().isBefore(LocalDate.now()))).findFirst().orElse(null);


    }
}
