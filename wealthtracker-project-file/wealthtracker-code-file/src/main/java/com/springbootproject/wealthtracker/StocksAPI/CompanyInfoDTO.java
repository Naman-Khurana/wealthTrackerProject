package com.springbootproject.wealthtracker.StocksAPI;

import jdk.jfr.Name;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyInfoDTO {
    private String companyName;
    private String symbol;
    private String website;
    private String exchange;
    private String currency;
    private double price;
    private String sector;
    private String industry;
    private String isin;
    private String ceo;
    private String country;
    private String address;
}
