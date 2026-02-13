"use client"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export default function DashBoardFetch(){



    const handleAddition= async()=>{
        try{
            // axios.post('http://localhost:8080/api/expenses/budget/set', {    
            //     amount : 500000,
            //     category : "TOTAL EXPENSES",
            //     startDate: "2025-07-01",
            //     endDate : "2025-07-31", 
            //     budgetRangeCategory : "MONTHLY",
            // },{
            //     withCredentials: true
            // })
            const details=await axios.get('http://localhost:8080/api/expenses/budget/percentageAllCategoriesBudgetUsedBudgetRangeCategoryWise', 
                {
                    params:{
                        budgetRangeCategory : "MONTHLY"
                    },
                withCredentials: true,    
            });
            console.log(details.data)
            
            
        }catch(error){
                console.log("Error setting the budget..");
                return null
        }
    };
    
        // fetchDetails();
    return(
        <button onClick={handleAddition} ></button>
    )


}