package com.springbootproject.wealthtracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "account_holder")
public class AccountHolder {
    //atrributes setup
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name="password")
    private String password;

    @OneToMany(mappedBy = "accountHolder",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.ALL}
    )
    private List<Earnings> earnings;
    @OneToMany(mappedBy = "accountHolder",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.ALL}
    )
    private List<Expenses> expenses;
    @OneToMany(mappedBy = "accountHolder",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL
    )
    private List<Roles> roles;

    @OneToMany(mappedBy = "accountHolder",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private List<Budget> budgets;


    //constructors

    public AccountHolder() {
    }

    public AccountHolder(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    //getters setters


    //toString


    @Override
    public String toString() {
        return "AccountHolder{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    //convenience Bi-Directional methods

    //for Expenses
    public void add(Expenses tempExpenses){
        if(expenses==null)
            expenses=new ArrayList<>();
        //now add relation bettween the two entities from both the sides

        //from AccountHolder side
        expenses.add(tempExpenses);

        //from Expenses side
        tempExpenses.setAccountHolder(this);
    }

    //for Earnings

    public void add(Earnings tempEarnings){
        if(earnings==null){
            earnings=new ArrayList<>();
        }
        //accountholder --> earnings
        earnings.add(tempEarnings);
        //earnings--> accountholder
        tempEarnings.setAccountHolder(this);
    }

    //for  roles
    public void add(Roles role){
        if(roles==null){
            roles=new ArrayList<>();
        }
        roles.add(role);
        role.setAccountHolder(this);
    }

    //for budget
    public void add(Budget budget){
        if(budgets==null){
            budgets=new ArrayList<>();
        }
        budgets.add(budget);
        budget.setAccountHolder(this);
    }


    /*  public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Earnings> getEarnings() {
        return earnings;
    }

    public void setEarnings(List<Earnings> earnings) {
        this.earnings = earnings;
    }

    public List<Expenses> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expenses> expenses) {
        this.expenses = expenses;
    }


    public List<Roles> getRoles() {
        return roles;
    }

    public void setRoles(List<Roles> roles) {
        this.roles = roles;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Budget> getBudgets() {
        return budgets;
    }

    public void setBudgets(List<Budget> budgets) {
        this.budgets = budgets;
    }
*/

}
