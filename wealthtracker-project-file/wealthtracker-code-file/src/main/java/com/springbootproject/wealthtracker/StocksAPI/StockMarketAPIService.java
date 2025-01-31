package com.springbootproject.wealthtracker.StocksAPI;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

public interface StockMarketAPIService {

    public List<StockPrice> getStockPriceByCompanyName();
    public StockPrice getStockPriceByCompanyName(String companyName);

    public CompanyInfoDTO getStockPriceByTradableSearchAPI(String companyName);

    public JsonNode getNASDAQCompany(JsonNode responseBody);

}

