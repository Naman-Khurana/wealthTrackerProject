package com.springbootproject.wealthtracker.entity;

import com.springbootproject.wealthtracker.customDataType.BudgetRangeCategoryType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Optional;

@Entity
@Getter
@Setter
@Table(name = "budget")
public class Budget {


    /// Add a range-category i.e monthly, yearly and custom
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "amount")
    private double amount;

    @Column(name = "category")
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "range_category")
    private BudgetRangeCategoryType budgetRangeCategory;


    @Column(name = "start_date")
    private LocalDate startDate;


    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "account_holder_id")
    private AccountHolder accountHolder;

    //constructor


    public Budget() {
    }

    public Budget(Optional<Budget> tempBudget1) {

    }

    public Budget(double amount, String category, LocalDate startDate, LocalDate endDate, BudgetRangeCategoryType budgetRangeCategory) {
        this.amount = amount;
        this.category = category;
        this.startDate = startDate;
        this.endDate = endDate;
        this.budgetRangeCategory=budgetRangeCategory;
    }

    //toString


    @Override
    public String toString() {
        return "Budget{" +
                "id=" + id +
                ", amount=" + amount +
                ", category='" + category + '\'' +
                ", rangeCategory=" + budgetRangeCategory +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                '}';
    }
}

