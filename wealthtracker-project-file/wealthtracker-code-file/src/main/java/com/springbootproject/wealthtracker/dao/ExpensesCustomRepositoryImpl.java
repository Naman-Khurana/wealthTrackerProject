package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Expenses;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ExpensesCustomRepositoryImpl implements ExpensesCustomRepository{
    private EntityManager entityManager;

    @Autowired
    public ExpensesCustomRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Expenses findExpenseUsingExpenseIdAndAccountHolder(AccountHolder accountHolder, int expenseid) throws Exception {
        System.out.println("USING findExpenseUsingExpenseIdAndAccountHolder in Expenses Custom Repository");
        TypedQuery<Expenses> query= entityManager.createQuery(
             "select e from Expenses e "  +
                "WHERE e.accountHolder= :theAccountHolder "+
                "AND e.id= :expenseId",Expenses.class
        );
        query.setParameter("theAccountHolder",accountHolder);
        query.setParameter("expenseId",expenseid);

        try{
            Expenses tempExpense=query.getSingleResult();
            return tempExpense;
        }
        catch (NoResultException e){
            System.out.println("Expense with ID : " + expenseid + " doesn't exist in " + accountHolder.getFirstName()+ " account.");
           throw new Exception("EXPENSE COULDN'T BE FOUND!!!! ");
        }
    }

    @Override
    public List<Expenses> getEssentialExpensesOnly(AccountHolder accountHolder, List<String> subCategories) {
        TypedQuery<Expenses> query=entityManager.createQuery(
                "select e from Expenses e "+
                        "WHERE e.accountHolder= :theAccountHolder "+
                        "AND e.category IN :essentialCategories", Expenses.class
        );
        query.setParameter("theAccountHolder",accountHolder);
        query.setParameter("essentialCategories", subCategories);

        try{
            List<Expenses> essentailExpenses=query.getResultList();
            return essentailExpenses;
        }
        catch (NoResultException e){
            System.out.println("No Essentail Expenses Record Found !!");
            return  new ArrayList<>();
        }
    }

    @Override
    public List<Expenses> getAnyCategoryAllExpenses(AccountHolder accountHolder,String category) {
        TypedQuery<Expenses> query=entityManager.createQuery(
                "select e from Expenses e "+
                        "WHERE e.accountHolder= :theAccountHolder "+
                        "AND e.category= :category", Expenses.class
        );
        query.setParameter("theAccountHolder",accountHolder);
        query.setParameter("essentialCategories", category);
        try{
            List<Expenses> categoryExpenses=query.getResultList();
            return categoryExpenses;
        }
        catch (NoResultException e){
            System.out.println("No Essentail Expenses Record Found !!");
            return  new ArrayList<>();
        }
    }

    @Override
    public List<Expenses> findExpensesListByDateRange(AccountHolder accountHolder, LocalDate startDate, LocalDate endDate) {
        TypedQuery<Expenses> query=entityManager.createQuery(
                "select e from Expenses e "+
                        "WHERE e.accountHolder= :theAccountHolder "+
                        "AND e.date BETWEEN :startDate AND :endDate", Expenses.class
        );
        query.setParameter("theAccountHolder" , accountHolder);
        query.setParameter("startDate" , startDate);
        query.setParameter("endDate",endDate);

        try{
            List<Expenses> expenses=query.getResultList();
            return expenses;
        }
        catch(Exception e){
            System.out.println("No Expenses Found in the Date range : " + startDate + " - " + endDate);
            return new ArrayList<>();
        }
    }
}
