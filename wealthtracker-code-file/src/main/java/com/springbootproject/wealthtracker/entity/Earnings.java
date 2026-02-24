package com.springbootproject.wealthtracker.entity;

import com.springbootproject.wealthtracker.enums.IncomeTypeEnum;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "earnings")
public class Earnings {

    //attributes setup

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "category")
    private String category;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "amount")
    private int amount;

    @Enumerated(EnumType.STRING)
    @Column(name="income_type",nullable = false)
    private IncomeTypeEnum incomeType;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "account_holder_id")
    private AccountHolder accountHolder;


    //constructors

    //foreign key element not included

    public Earnings(String category, String description, LocalDate date, int amount, IncomeTypeEnum incomeType) {
        this.category = category;
        this.description = description;
        this.date = date;
        this.amount = amount;
        this.incomeType=incomeType;
    }


    //toString
    //foreign key not included
    @Override
    public String toString() {
        return "Earnings{" +
                "id=" + id +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", amount=" + amount +
                ", income_type=" + incomeType +
                '}';
    }

}
