package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.entity.Subscription;

import java.util.List;
import java.util.Set;

public interface SubscriptionService {
    Subscription findActiveSubscription(Set<Subscription> subscriptionList);
}
