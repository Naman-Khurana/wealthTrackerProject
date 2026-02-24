"use client";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { format, set } from "date-fns"
import { Calendar as CalendarIcon , X} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import axios from "axios";
import { useState, useRef } from "react";
import { useAllEssentialExpensesWithDetails, useAllLuxuryExpensesWithDetails } from "./expenses-api-fetcher";
import Modal from "../comman/ui/modal";


type props ={
    closeAddBudget : ()=> void;
    isOpen: boolean
}

export default function AddBudgetSection({closeAddBudget,isOpen} : props) {
    const [open ,setOpen]=useState(true);
    const [selected,setSelected]=useState<string>("");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate,setEndDate] =useState<Date>();
    const [category,setCategory] =useState<string>("");
    const [dateCategory,setDateCategory]=useState("custom");

    const amountRef=useRef<HTMLInputElement>(null);
    

    const{
        data:allEssentialExpensesData,
        isLoading:loadingAllEssentialExpenses,
        isError:errorAllEssentialExpenses,
        error: allEssentialExpensesError,
    }=useAllEssentialExpensesWithDetails()


    const{
        data:allLuxuryExpensesData,
        isLoading:loadingAllLuxuryExpenses,
        isError:errorAllLuxuryExpenses,
        error: allLuxuryExpensesError,
    }=useAllLuxuryExpensesWithDetails()
  
    
    // console.log("All luxury expenses categories are  ;  ",allLuxuryExpensesData?.luxuryCategories ?? []);
    const categoryList=["Total Expenses","Luxury","Essential",...allEssentialExpensesData?.essentialCategories ?? [], ...allLuxuryExpensesData?.luxuryCategories ?? []]
    // console.log(categoryList);
    const categoryfields=categoryList.map((ctg) =>{
        return(
            <SelectItem value={ctg} className="z-[9999] text-black/60" >{ctg}</SelectItem>
        )
    })

    const handleCategoryChange=(category : string) => {
        setCategory(category);
        console.log(category);
    }


    const handleDateCategoryChange=(dateCategoryType : string)=>{
        setDateCategory(dateCategoryType);
        // console.log(dateCategorytype)
        if(dateCategoryType==="current-month"){
            const today =new Date();
            setStartDate(new Date(today.getFullYear(),today.getMonth(),1));
            setEndDate(new Date(today.getFullYear(),today.getMonth()+1,0 ));
        }else if(dateCategoryType==="current-year"){
            const today=new Date();
            setStartDate(new Date(today.getFullYear(),0,1));
            setEndDate(new Date(today.getFullYear()+1,0,0))
        }else{
            setStartDate(undefined);
            setEndDate(undefined);
        }

    }

    const handleSubmit=(e :React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const amountValue =amountRef.current?.value;

      const categoryValue=category;
      
      const startDateValue= startDate;  
      const endDateValue= endDate;

      const dateCategoryValue=dateCategory;
      const budgetRangeCategoryValue = () => {
  if (dateCategory === "current-year")
    return "YEARLY";
  else if (dateCategory === "current-month")
    return "MONTHLY";
  else
    return "CUSTOM";
};

      if(startDateValue===null || endDateValue===null || amountValue===null || category===""){
        console.log(
          "Incomplete details filled"
        )
      }else{

        console.log("start date : " + startDateValue);
        console.log("end date : " + endDateValue);
        console.log("amout value  : " + amountValue);
        console.log("category : " + categoryValue);
        console.log("date category : " + budgetRangeCategoryValue());
        axios.post('http://localhost:8080/api/expenses/budget/set', {    
                  category : categoryValue,
                  startDate : startDate?.toISOString().split('T')[0],
                  endDate : endDate?.toISOString().split('T')[0],
                  amount : amountValue, 
                  budgetRangeCategory : budgetRangeCategoryValue(),
              },{
                  withCredentials: true
        })
        .then(response=>{
          console.log("New Budget Added.")
          closeAddBudget();
        })
        .catch(error =>{
                console.log("error : ", error);})
            
      }
    }






  return (
    <Modal onClose={closeAddBudget} isOpen={isOpen}>
        <form className="relative flex flex-col items-center  h-full w-full p-0 m-0 text-black" onSubmit={(e)=> handleSubmit(e)}>
        <Button onClick={()=>closeAddBudget()} variant="ghost" className="absolute  right-3  top-5 w-[20%] text-white/50 hover:bg-black/50 hover:scale-[110%] transition-easy-inout "> <X /></Button>
        <div className="h-[2%]"></div>
        <h1 className="h-[10%] text-2xl flex items-center text-white">ADD BUDGET</h1>

        
        <section className="h-[80%] flex flex-col gap-8 w-[80%] z-[999] items-center justify-center">

          <section className="flex w-full ">
            <Input
              type="text"
              placeholder= "Enter amount "
              className="bg-white"
              ref={amountRef}
            />
          </section>

            <section className="w-full ">
        

            <Select onValueChange={handleCategoryChange} >
            <SelectTrigger className="w-full h-8 bg-white text-black/60 ">
                    
                    <SelectValue placeholder="Select Category"  />
                </SelectTrigger>

                <SelectContent className="z-[9999] text-black">
                <SelectGroup >
                    <SelectLabel className="flex flex-col">
                       
                        
                    </SelectLabel>

                    {categoryfields}
                    
                </SelectGroup>
            
                </SelectContent>
            </Select>
        </section>
        <section className="flex w-full gap-4 ">

            <section className="flex flex-col w-[70%] gap-4">
            <div className="w-full " >
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        disabled={dateCategory!=="custom" }
                        data-empty={!startDate}
                        className="data-[empty=true]:text-muted-foreground w-full justify-start  text-left font-normal"
                        >
                        <CalendarIcon />
                        {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full  z-[9999]">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="w-full" >
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        disabled={dateCategory!=="custom" }
                        data-empty={!endDate}
                        className="data-[empty=true]:text-muted-foreground w-full justify-start  text-left font-normal"
                        >
                        <CalendarIcon />
                        {endDate ? format(endDate, "PPP") : <span>End date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full  z-[9999]">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                    </PopoverContent>
                </Popover>
            </div>
            </section>
            <div className=" text-white flex justify-center items-center w-[25%] h-full text-nowrap">
                <RadioGroup 
                    defaultValue="custom" 
                    className="w-full " 
                    onValueChange={handleDateCategoryChange}    
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem   value="custom" id="custom"        
                        className="w-[8%] h-[50%] border-gray-400 data-[state=checked]:bg-red-800 data-[state=checked]:border-white "
                    />
                        <Label htmlFor="custom" className="text-xs">Custom</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="current-month" id="current-month" 
                        className="w-[8%] h-[50%] border-gray-400 data-[state=checked]:bg-white data-[state=checked]:border-white"

                    />
                        <Label htmlFor="current-month" className="text-xs">Current Month</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="current-year" id="current-year" 
                        className="w-[8%] h-[50%] border-gray-400 data-[state=checked]:bg-white data-[state=checked]:border-white"

                    />
                        <Label htmlFor="current-year" className="text-xs">Current Year</Label>
                    </div>
                </RadioGroup>
            </div>

        
        </section>

        
        
        </section>
        <div className="h-[12%]">
            <Button variant="secondary">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
