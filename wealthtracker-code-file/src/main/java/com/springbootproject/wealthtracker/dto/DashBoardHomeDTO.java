package com.springbootproject.wealthtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashBoardHomeDTO {
    private String User;
    private double totalExpense;

    private double totalEarnings;

    //constructors
   /* public DashBoardHomeDTO() {
    }

    public DashBoardHomeDTO(String user, double totalExpense, double totalEarnings) {
        User = user;
        this.totalExpense = totalExpense;
        this.totalEarnings = totalEarnings;
    }


    //getter setter


    public String getUser() {
        return User;
    }

    public void setUser(String user) {
        User = user;
    }

    public double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public double getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    //toString


    @Override
    public String toString() {
        return "DashBoardHomeDTO{" +
                "User='" + User + '\'' +
                ", totalExpense=" + totalExpense +
                ", totalEarnings=" + totalEarnings +
                '}';
    }*/
}
