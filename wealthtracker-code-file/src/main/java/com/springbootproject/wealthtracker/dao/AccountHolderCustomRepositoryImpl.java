package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.entity.Expenses;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AccountHolderCustomRepositoryImpl implements AccountHolderCustomRepository{
    private EntityManager entityManager;
    @Autowired
    public AccountHolderCustomRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public AccountHolder findAccountNExpenses(int theId) {
        System.out.println("Using findAccountNExpenses in Account Holder Custom Repository");
        System.out.println(entityManager.find(AccountHolder.class,theId));
        TypedQuery<AccountHolder> query=entityManager.createQuery(
                "select a from AccountHolder a "+
                    "JOIN FETCH a.expenses "+
                        "where a.id= :theId",AccountHolder.class
        );
        query.setParameter("theId",theId);

        try {
            AccountHolder tempAccountHolder=query.getSingleResult();
            return tempAccountHolder;
        }catch (NoResultException e){
            System.out.println("AccountHolder doesn't have any expenses record till now");
            return entityManager.find(AccountHolder.class,theId);
        }

    }
    @Override
    public AccountHolder findAccountNEarnings(int theId) {
        System.out.println("Using findAccountNEarnings in Account Holder Custom Repository");
        TypedQuery<AccountHolder> query=entityManager.createQuery(
                "select a from AccountHolder a "+
                    "JOIN FETCH a.earnings "+
                        "where a.id= :theId",AccountHolder.class
        );
        query.setParameter("theId",theId);
        System.out.println("QUery FETCHED");
        try {
            AccountHolder tempAccountHolder=query.getSingleResult();
            return tempAccountHolder;
        }catch (NoResultException e){
            System.out.println("AccountHolder doesn't have any earnings record till now");
            return entityManager.find(AccountHolder.class,theId);
        }

    }

    //this function should be part of expenses custom repository
    @Override
    public List<Expenses> findExpensesListOnly(AccountHolder accountHolder) {
        System.out.println("Using findExpensesListOnly in Account Holder Custom Repository");
        TypedQuery<Expenses> query=entityManager.createQuery(
                "select e from Expenses e " +
                        "WHERE e.accountHolder= :accountHolder", Expenses.class
        );
        query.setParameter("accountHolder",accountHolder);
        try {
            List<Expenses> expenseList=query.getResultList();
            return expenseList;

        }
        catch (NoResultException e){
            System.out.println("No Expenses Till Now !!");

        }return new ArrayList<Expenses>();
    }

    //this function should be part of earnings custom repository
    @Override
    public List<Earnings> findEarningsListOnly(AccountHolder accountHolder) {

        System.out.println("Using findEarningsListOnly in Account Holder Custom Repository");
        TypedQuery<Earnings> query=entityManager.createQuery(
                "select e from Earnings e " +
                        "WHERE e.accountHolder= :accountHolder", Earnings.class
        );
        query.setParameter("accountHolder",accountHolder);
        try {
            List<Earnings> earningList=query.getResultList();
            return earningList;

        }
        catch (NoResultException e){
            System.out.println("No Earnings Till Now !!");

        }return new ArrayList<Earnings>();

    }
}
