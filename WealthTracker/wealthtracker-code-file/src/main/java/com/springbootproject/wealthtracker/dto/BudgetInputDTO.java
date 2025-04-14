package com.springbootproject.wealthtracker.dto;

import com.springbootproject.wealthtracker.validator.CategoryValidation;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudgetInputDTO {

    @NotNull
    @Min(value = 1, message = "Amount value can't be < 1." )
    private double amount;

    @CategoryValidation
    private String category;


    private LocalDate startDate;

    private LocalDate endDate;



}
