"use client"
import axiosInstance from "@/lib/axios_instance";
import { useQuery } from "@tanstack/react-query";
export default function DashBoardFetch(){



    const handleAddition= async()=>{
        try{
           
            const details=await axiosInstance.get('/expenses/budget/percentageAllCategoriesBudgetUsedBudgetRangeCategoryWise', 
                {
                    params:{
                        budgetRangeCategory : "MONTHLY"
                    },
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