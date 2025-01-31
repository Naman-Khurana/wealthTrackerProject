package com.springbootproject.wealthtracker.dao;

import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.entity.Expenses;

import java.time.LocalDate;
import java.util.List;

public interface EarningsCustomRepository {
    Earnings findEarningUsingEarningIdAndAccountHolder(AccountHolder accountHolder, int earningid) throws Exception;

    List<Earnings> findEarningsListByDateRange(AccountHolder accountHolder, LocalDate startDate,LocalDate endDate);
}
