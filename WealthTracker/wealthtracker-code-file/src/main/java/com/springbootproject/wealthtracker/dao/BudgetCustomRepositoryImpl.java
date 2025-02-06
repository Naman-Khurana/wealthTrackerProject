/*
package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class BudgetCustomRepositoryImpl implements BudgetCustomRespository{

    private EntityManager entityManager;

    @Autowired
    public BudgetCustomRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @Override
   public Optional<Budget> getBudgetUsingAccountHolderAndCategory(AccountHolder accountHolder, String category) {
        TypedQuery<Budget> query;
        query = entityManager.createQuery(
                "select b from Budget b " +
                        "where b.accountHolder= :accountHolder " +
                        "AND b.category= :category", Budget.class
        );
        query.setParameter("accountHolder", accountHolder);
        query.setParameter("category", category);

        List<Budget> resultList = query.getResultList();

        // Return the first result if exists, otherwise empty Optional
        return resultList.stream().findFirst();
    }


    @Override
    public Optional<Budget> getBudgetUsingAccountHolderAndCategory(AccountHolder accountHolder,String category, LocalDate startDate,LocalDate endDate) {

        TypedQuery<Budget> query = entityManager.createQuery(
                "select b from Budget b " +
                        "WHERE b.accountHolder= :accountHolder " +
                        "AND b.category= :category " +
                        "AND b.startDate <= :startDate "+
                        "AND b.endDate >= :endDate", Budget.class
        );
        query.setParameter("accountHolder", accountHolder);
        query.setParameter("category", category);
        query.setParameter("startDate",startDate);
        query.setParameter("endDate",endDate);



        Optional<Budget> result = Optional.ofNullable(query.getSingleResult());
        try {
            return result;
        }
        catch (Exception e){
            System.out.println("NOT FOUND ANY BUDGET");
        }
        return Optional.empty();
        // Return the first result if exists, otherwise empty Optional
    }
}
*/
