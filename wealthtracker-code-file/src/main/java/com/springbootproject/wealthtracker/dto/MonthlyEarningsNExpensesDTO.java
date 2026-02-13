package com.springbootproject.wealthtracker.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

@Getter
@Setter
public class MonthlyEarningsNExpensesDTO {
    private Integer year;

    @Min(1)@Max(12)
    private Integer month;

    private Double total;

    public MonthlyEarningsNExpensesDTO(Integer year, Integer month, double total) {
        this.year = year;
        this.month = month;
        this.total = total;
    }
    public MonthlyEarningsNExpensesDTO() {}
}
