package com.springbootproject.wealthtracker.StocksAPI;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StockPrice {
    private String symbol;
    private String exchange;
    private String exchangeShortName;
    private double price;
    private String name;
}
