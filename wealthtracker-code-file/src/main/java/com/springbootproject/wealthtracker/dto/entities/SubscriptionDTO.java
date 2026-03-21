package com.springbootproject.wealthtracker.dto.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class SubscriptionDTO {
    private String planName;
    private LocalDate endDate;
    private boolean active;
}