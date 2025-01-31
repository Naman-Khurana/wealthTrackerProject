package com.springbootproject.wealthtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseOrEarningInDetailDTO {
    private String category ;
    private String description;
    private LocalDate date ;
    private double amount;
/*
    public ExpenseOrEarningInDetailDTO() {
    }

    public ExpenseOrEarningInDetailDTO(String category, String description, LocalDate date, double amount) {
        this.category = category;
        this.description = description;
        this.date = date;
        this.amount = amount;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "ExpenseOrEarningInDetailDTO{" +
                "category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", amount=" + amount +
                '}';
    }*/
}
