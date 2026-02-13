package com.springbootproject.wealthtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilteredExpenseOrEarningInfoDTO {
    private String category ;

    private LocalDate date ;
    private double amount;

    //constructor

    public FilteredExpenseOrEarningInfoDTO(double amount) {
        this.amount = amount;
    }

    //getter setter
/*

    public FilteredExpenseOrEarningInfoDTO() {
    }

    public FilteredExpenseOrEarningInfoDTO(String category , LocalDate date, double amount) {
        this.category = category;

        this.date = date;
        this.amount = amount;
    }
*/
/*

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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
    }*/
}