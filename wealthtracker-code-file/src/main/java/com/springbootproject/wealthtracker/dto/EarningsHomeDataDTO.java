package com.springbootproject.wealthtracker.dto;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EarningsHomeDataDTO {

    private List<FilteredExpenseOrEarningInfoDTO> earningsList;
    private double totalEarnings;

  
}
