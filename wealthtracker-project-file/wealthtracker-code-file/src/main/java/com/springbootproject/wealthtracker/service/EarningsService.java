package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dto.EarningsHomeDataDTO;
import com.springbootproject.wealthtracker.dto.ExpenseOrEarningInDetailDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import com.springbootproject.wealthtracker.entity.Earnings;

import java.time.LocalDate;

public interface EarningsService {

    EarningsHomeDataDTO getEarningsHomeData(int userid, LocalDate startDate,LocalDate endDate);
    void addNewEarningsToUserUsingId(int userid, Earnings newEarnings);

    ExpenseOrEarningInDetailDTO updateEarningToUser(int userid, Earnings theEarnings) throws Exception;

    void deleteEarningWithIdFromAccountHolder(int userid,int earningid) throws Exception;

    ExpenseOrEarningInDetailDTO getEarningWithIdFromAccountHolderId(int userid, int earningid) throws Exception;

}
