package com.springbootproject.wealthtracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EarningsHomeDataDTO {

    private List<FilteredExpenseOrEarningInfoDTO> earningsList;
    private double totalEarnings;

    /*public EarningsHomeDataDTO(List<FilteredExpenseOrEarningInfoDTO> earningsList, double totalEarnings) {
        this.earningsList = earningsList;
        this.totalEarnings = totalEarnings;
    }

    public List<FilteredExpenseOrEarningInfoDTO> getEarningsList() {
        return earningsList;
    }

    public void setEarningsList(List<FilteredExpenseOrEarningInfoDTO> earningsList) {
        this.earningsList = earningsList;
    }

    public double getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }


    @Override
    public String toString() {
        return "EarningsHomeDataDTO{" +
                "earningsList=" + earningsList +
                ", totalEarnings=" + totalEarnings +
                '}';
    }*/
}
