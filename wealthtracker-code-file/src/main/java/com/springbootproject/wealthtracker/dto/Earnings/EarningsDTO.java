package com.springbootproject.wealthtracker.dto;

import com.springbootproject.wealthtracker.enums.IncomeTypeEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EarningsDTO {

    private Integer id;

    private String category;

    private String description;

    private LocalDate date;

    private Integer amount;

    private IncomeTypeEnum incomeType;
}