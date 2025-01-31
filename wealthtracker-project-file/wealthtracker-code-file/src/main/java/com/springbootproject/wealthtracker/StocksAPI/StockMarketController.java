package com.springbootproject.wealthtracker.StocksAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@PreAuthorize("((hasRole('PREMIUM_USER') || hasRole('ADMIN')) && #userid.toString() == principal.username)")
@RestController
@RequestMapping("/api/{userid}/invest/stock")
public class StockMarketController {

    private StockMarketAPIService stockMarketAPIService;

    @Autowired
    public StockMarketController(StockMarketAPIService stockMarketAPIService) {
        this.stockMarketAPIService = stockMarketAPIService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<StockPrice>> getStockList(){
        List<StockPrice> stockPrice=stockMarketAPIService.getStockPriceByCompanyName();
        if(stockPrice!=null){
            return new ResponseEntity<>(stockPrice, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{companyName}")
    public ResponseEntity<StockPrice> getCompanyStockInfo(@PathVariable("companyName") String companyName){
        StockPrice companyStock=stockMarketAPIService.getStockPriceByCompanyName(companyName);
        if(companyStock!=null){
            return new ResponseEntity<>(companyStock, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<CompanyInfoDTO> getCompanyStockInfoByTradableSearchAPI(@PathVariable("companyName") String companyName){
        if(companyName==null){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        CompanyInfoDTO companyStock=stockMarketAPIService.getStockPriceByTradableSearchAPI(companyName);
        if(companyStock!=null){
            return new ResponseEntity<>(companyStock,HttpStatus.OK);
        }
        else{
            System.out.println("SERVER ERROR");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
