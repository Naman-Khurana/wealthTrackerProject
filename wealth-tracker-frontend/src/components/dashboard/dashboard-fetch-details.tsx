"use client"
import axiosInstance from "@/lib/axios_instance";
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
                console.log(`Error setting the budget.. : ${error}`  );
                return null
        }
    };
    
        // fetchDetails();
    return(
        <button onClick={handleAddition} ></button>
    )


}