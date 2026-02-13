package com.springbootproject.wealthtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpensesCategoryWithPercentageUsageDTO {
    private String category;
    private double percentageUsed;
}
