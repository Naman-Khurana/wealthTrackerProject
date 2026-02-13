package com.springbootproject.wealthtracker.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BudgetUsageResponseDTO {
    private boolean budgetExists;
    private double percentageUsed;

}
