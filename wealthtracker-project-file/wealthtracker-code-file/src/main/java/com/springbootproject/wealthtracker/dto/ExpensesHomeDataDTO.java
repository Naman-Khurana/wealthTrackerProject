package com.springbootproject.wealthtracker.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ExpensesHomeDataDTO {
    private List<FilteredExpenseOrEarningInfoDTO> expensesList;
    private double totalExpenses;

    //only include if non emppty

    private String TotalBudgetConstraintVoilation;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String ParentCategoryBudgetConstraintVoilation;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String CategoryBudgetConstraintVoilation;




    //constructor



    public ExpensesHomeDataDTO(List<FilteredExpenseOrEarningInfoDTO> expensesList) {
        this.expensesList = expensesList;
    }


    public ExpensesHomeDataDTO(List<FilteredExpenseOrEarningInfoDTO> expensesList, double totalExpenses) {
        this.expensesList = expensesList;
        this.totalExpenses = totalExpenses;
    }
/*

    public ExpensesHomeDataDTO() {
    }
*/


    /*

    //getter setter


    public List<FilteredExpenseOrEarningInfoDTO> getExpensesList() {
        return expensesList;
    }

    public void setExpensesList(List<FilteredExpenseOrEarningInfoDTO> expensesList) {
        this.expensesList = expensesList;
    }

    public double getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(double totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public String getTotalBudgetConstraintVoilation() {
        return TotalBudgetConstraintVoilation;
    }

    public void setTotalBudgetConstraintVoilation(String totalBudgetConstraintVoilation) {
        TotalBudgetConstraintVoilation = totalBudgetConstraintVoilation;
    }

    public String getParentCategoryBudgetConstraintVoilation() {
        return ParentCategoryBudgetConstraintVoilation;
    }

    public void setParentCategoryBudgetConstraintVoilation(String parentCategoryBudgetConstraintVoilation) {
        ParentCategoryBudgetConstraintVoilation = parentCategoryBudgetConstraintVoilation;
    }

    public String getCategoryBudgetConstraintVoilation() {
        return CategoryBudgetConstraintVoilation;
    }

    public void setCategoryBudgetConstraintVoilation(String categoryBudgetConstraintVoilation) {
        CategoryBudgetConstraintVoilation = categoryBudgetConstraintVoilation;
    }

    //toString

    @Override
    public String toString() {
        return "ExpensesHomeDataDTO{" +
                "expensesList=" + expensesList +
                ", totalExpenses=" + totalExpenses +
                '}';
    }*/
}
