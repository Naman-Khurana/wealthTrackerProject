package com.springbootproject.wealthtracker.dto.Earnings;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Setter
public class EarningsIncomeTypeWiseDTO {
    double totalEarnings;
    double oneTimeEarnings;
    double recurringEarnings;

}
