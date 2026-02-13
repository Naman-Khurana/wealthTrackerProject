package com.springbootproject.wealthtracker.dto;


import com.springbootproject.wealthtracker.validator.CategoryValidation;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


//This function is created but has to be embedded in the input functions of expenses and earnings

@Getter
@Setter

public class ExpensesNEarningsInputDTO {

    @NotBlank
    @CategoryValidation
    private String category;


    private String description;

    public ExpensesNEarningsInputDTO(int amount, LocalDate date, String category) {
        this.amount = amount;
        this.date = date;
        this.category = category;
    }

    private LocalDate date;

    @NotNull
    @Min(value = 1,message = "Expense value must be > 1.")
    private int amount;


}
