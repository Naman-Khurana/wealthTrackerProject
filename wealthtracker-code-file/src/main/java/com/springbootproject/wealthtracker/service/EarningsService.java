package com.springbootproject.wealthtracker.service;

import com.springbootproject.wealthtracker.dto.*;
import com.springbootproject.wealthtracker.dto.EarningsDTO;
import com.springbootproject.wealthtracker.entity.AccountHolder;
import com.springbootproject.wealthtracker.entity.Budget;
import com.springbootproject.wealthtracker.entity.Earnings;
import com.springbootproject.wealthtracker.entity.Expenses;


import java.time.LocalDate;
import java.util.List;

public interface EarningsService {

    EarningsHomeDataDTO getEarningsHomeData(int userid, LocalDate startDate,LocalDate endDate);
    Earnings addNewEarningsToUserUsingId(int userid, EarningsDTO newEarnings);

    EarningsDTO updateEarningToUser(int userid, Earnings theEarnings) throws Exception;

    void deleteEarningWithIdFromAccountHolder(int userid,int earningid) throws Exception;

    EarningsDTO getEarningWithIdFromAccountHolderId(int userid, int earningid) throws Exception;

    Earnings convertInputToEarning(EarningsDTO earnings);
    List<MonthlyEarningsNExpensesDTO> getLastSixMonthsEarnings(int userid);


}
