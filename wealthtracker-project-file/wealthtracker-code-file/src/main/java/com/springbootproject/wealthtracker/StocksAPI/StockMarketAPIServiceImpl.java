package com.springbootproject.wealthtracker.StocksAPI;

import com.fasterxml.jackson.databind.JsonNode;
import com.springbootproject.wealthtracker.error.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class StockMarketAPIServiceImpl implements StockMarketAPIService {

private RestTemplate restTemplate;

    @Autowired
    public StockMarketAPIServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    String apiKey="7EMrPh72H32fTXgGw5l3u8thLn6kCg0n";
    String url="https://financialmodelingprep.com/api/v3/stock/list?limit=100&apikey="+apiKey;

    @Override
    public List<StockPrice> getStockPriceByCompanyName() {



        ResponseEntity<StockPrice[]> response=restTemplate.getForEntity(url,StockPrice[].class);
        if(response.getStatusCode()== HttpStatus.OK){
            StockPrice[] stockPricesArray = response.getBody();
            /*for(StockPrice ele: stockPricesArray){

            }*/
            if(stockPricesArray!=null){
                return Arrays.asList(stockPricesArray);
            }else {
                return Collections.emptyList();
            }


        }
        else{
            System.out.println("3rd PARTY API ERROR COULDNT BE FETCHED.");
            return Collections.emptyList();
        }
    }

    @Override
    public StockPrice getStockPriceByCompanyName(String companyName) {

        ResponseEntity<StockPrice[]> response=restTemplate.getForEntity(url,StockPrice[].class);
        if(response.getStatusCode()== HttpStatus.OK){
            StockPrice[] stockPricesArray = response.getBody();
            for(StockPrice ele: stockPricesArray){
                if(ele.getName().equals(companyName) || ele.getSymbol().equals(companyName))
                    return ele;
            }
            System.out.println("Company doesnt't exist in the database!!");
            return new StockPrice();

        }
        else{
            System.out.println("3rd PARTY API ERROR COULDNT BE FETCHED.");
            return new StockPrice();
        }

    }



    @Override
    public CompanyInfoDTO getStockPriceByTradableSearchAPI(String companyName) {
        //get company info for inputted company name
        String url1 = "https://financialmodelingprep.com/api/v3/profile/" + companyName + "?apikey=" + apiKey;
        CompanyInfoDTO[] response= restTemplate.getForEntity(url1, CompanyInfoDTO[].class).getBody();
        //if company name is incorrect check if the user inputted the general name
        if(response.length==0){
            System.out.println("the Company Symbol has not been used ");
            //check  if general name has been inputted
            String Symbol=convertCompanyNameToSymbol(companyName);
            System.out.println("Company Symbol is returned as : "+ Symbol);
            //if no such company is found by the inputted name for symbol or general name
            if(Symbol.length()==0){
                System.out.println("NO SUCH STOCK FOUND");
                throw new NotFoundException("NO STOCK FOUND FOR NAME/SYMBOL  : " +companyName);
            }
            //otherwise get the company info for given symbol
            companyName=Symbol;
            System.out.println(companyName);
            url1 = "https://financialmodelingprep.com/api/v3/profile/" + companyName + "?apikey=" + apiKey;
            response=restTemplate.getForEntity(url1,CompanyInfoDTO[].class).getBody();
            System.out.println( "Inside Response ; "+Arrays.asList(response));
        }

        System.out.println("OUTSIDE RESPONSE : "+ response);
        //return the info
        return response[0];
    }

    public String convertCompanyNameToSymbol(String companyName){
        //check for company using general name
        String url2="https://financialmodelingprep.com/api/v3/search?query="+companyName+"&limit=10&apikey="+apiKey;
        ResponseEntity<JsonNode> response2=restTemplate.getForEntity(url2, JsonNode.class);
        System.out.println("the returned response of search by Company Name is :  ");
        System.out.println(response2);
        JsonNode companyNode=null;
        System.out.println("CHECKING THE SIZE ");
        System.out.println(response2.getBody().size());
        //if size of the list of company with general name same/similar as inputted
        if(response2.getBody().size()>1){
            System.out.println("ChECKING OFR NASDAQ");
            //if possible get the company with NASDAQ exchange(USD)
            companyNode=getNASDAQCompany(response2.getBody());
            //if NASDAQ stock not found , then get the first stock in list
            if(companyNode==null)
                companyNode = response2.getBody().isArray() ? response2.getBody().get(0) : response2.getBody();


            //if size of list of company is 1 , then get the company
        }else if(response2.getBody().size()==1){
            System.out.println("LEnght is 1");
            companyNode = response2.getBody().isArray() ? response2.getBody().get(0) : response2.getBody();
        }
        System.out.println("CompanyNode is : " + companyNode);
        //return the company symbol

        if(companyNode !=null&& companyNode.has("symbol")){
            return companyNode.get("symbol").asText();
        }
        //
        else
            return "";

    }

    public JsonNode getNASDAQCompany(JsonNode responseBody){
        System.out.println("ChECKING OFR NASDAQ");
        for(JsonNode ele :responseBody){
            if(ele.get("stockExchange").asText().equals("NASDAQ Global Select")){
                System.out.println("FOUND AN ELEMENT FOR NASDAQ");
                return ele;
            }

        }
        return null;
    }


}
