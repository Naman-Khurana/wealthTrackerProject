package com.springbootproject.wealthtracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;

@Entity
@Getter
@Setter
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


    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "account_holder_id")
    private AccountHolder accountHolder;

    //constructors

    public Earnings() {
    }

    //foreign key element not included

    public Earnings(String category, String description, LocalDate date, int amount) {
        this.category = category;
        this.description = description;
        this.date = date;
        this.amount = amount;
    }

    //getter setter


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
                '}';
    }







    /*

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public AccountHolder getAccountHolder() {
        return accountHolder;
    }

    public void setAccountHolder(AccountHolder accountHolder) {
        this.accountHolder = accountHolder;
    }
*/


    //setup relation between parent and child classes
}
