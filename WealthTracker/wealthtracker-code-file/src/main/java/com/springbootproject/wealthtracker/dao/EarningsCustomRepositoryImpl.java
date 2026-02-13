package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.entity.Expenses;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class EarningsCustomRepositoryImpl implements EarningsCustomRepository{

    private EntityManager entityManager;

    @Autowired
    public EarningsCustomRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Earnings findEarningUsingEarningIdAndAccountHolder(AccountHolder accountHolder, int earningid) throws Exception {
        System.out.println("USING findEarningUsingEarningIdAndAccountHolder in Earnings Custom Repository");
        TypedQuery<Earnings> query= entityManager.createQuery(
                "select e from Earnings e "  +
                        "WHERE e.accountHolder= :theAccountHolder "+
                        "AND e.id= :earningId",Earnings.class
        );
        query.setParameter("theAccountHolder",accountHolder);
        query.setParameter("earningId",earningid);

        try{
            Earnings tempEarning=query.getSingleResult();
            return tempEarning;
        }
        catch (NoResultException e){
            System.out.println("Earning with ID : " + earningid + " doesn't exist in " + accountHolder.getFirstName()+ " account.");
            throw new Exception("EARNINGS COULDN'T BE FOUND!!!! ");
        }
    }

    @Override
    public List<Earnings> findEarningsListByDateRange(AccountHolder accountHolder, LocalDate startDate, LocalDate endDate) {
        TypedQuery<Earnings> query=entityManager.createQuery(
                "select e from Earnings e "+
                        "WHERE e.accountHolder= :theAccountHolder "+
                        "AND e.date BETWEEN :startDate AND :endDate", Earnings.class
        );
        query.setParameter("theAccountHolder" , accountHolder);
        query.setParameter("startDate" , startDate);
        query.setParameter("endDate",endDate);

        try{
            List<Earnings> earnings=query.getResultList();
            return earnings;
        }
        catch(Exception e){
            System.out.println("No Earnings Found in the Date range : " + startDate + " - " + endDate);
            return new ArrayList<>();
        }
    }
}
