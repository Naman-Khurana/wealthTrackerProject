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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Calendar as CalendarIcon , X} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState, useRef } from "react";
import { useAllEssentialExpensesWithDetails, useAllLuxuryExpensesWithDetails } from "./expenses-api-fetcher";
import axios from "axios";

type props ={
    closeAddExpenses : ()=> void;
}



export default function AddExpensesSection({closeAddExpenses} : props) {
    const [open ,setOpen]=useState(false);
    const [selected,setSelected]=useState<string>("");
    const [date, setDate] = useState<Date>()
    const [category, setCategory] =useState<string>("");
    

    const amountRef=useRef<HTMLInputElement>(null);
    const descriptionRef=useRef<HTMLTextAreaElement>(null);
    

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
    const categoryList=[...allEssentialExpensesData?.essentialCategories ?? [], ...allLuxuryExpensesData?.luxuryCategories ?? []]
    console.log(categoryList);
    const categoryfields=categoryList.map((ctg) =>{
        return(
            <SelectItem value={ctg} className="z-[9999]" >{ctg}</SelectItem>
        )
    })

    const handleCategoryChange=(category : string) =>{
      setCategory(category);
      console.log(category);
    };


    const handleSubmit=(e :React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const amountValue =amountRef.current?.value;

      const descValue=descriptionRef.current?.value;
      const categoryValue=category;
      if(date===null){
        setDate(new Date());
      }
      const dateValue= date;  


      if(date===null || amountValue===null || category===""){
        console.log(
          "Incomplete details filled"
        )
      }else{

        axios.post('http://localhost:8080/api/expenses/add', {    
                  category : categoryValue,
                  date : date?.toISOString().split('T')[0],
                  amount : amountValue, 
                  description : descValue
              },{
                  withCredentials: true
        })
        .then(response=>{
          console.log("New Expense Added.")
          closeAddExpenses();
        })
        .catch(error =>{
                console.log("error : ", error);})
            
      }
    }

    const handleCalenderPop= (selectedDate : Date | undefined) =>{
      setDate(selectedDate);
      setOpen(false);
    }
  return (
    <>
     <main className="absolute bg-black w-[40%] h-[80%] z-[998] p-0 rounded-4xl flex justify-center items-center border border-gray-600 shadow-2xl left-50">
      <form className="relative flex flex-col items-center  h-full w-full p-0 m-0 text-black" onSubmit={(e) =>handleSubmit(e)}>
        <Button onClick={()=>closeAddExpenses()} variant="ghost" className="absolute  right-3  top-5 w-[20%] text-white/50 hover:bg-black/50 hover:scale-[110%] transition-easy-inout "> <X /></Button>
        <div className="h-[2%]"></div>
        <h1 className="h-[10%] text-2xl flex items-center text-white">ADD EXPENSE</h1>

        
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

          <div className="w-full" >
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-full justify-start  text-left font-normal"
                    >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full  z-[9999]">
                    <Calendar mode="single" selected={date} onSelect={handleCalenderPop} />
                </PopoverContent>
            </Popover>
        </div>

        
        

        <Textarea className="bg-white" placeholder="Enter expense Description Here." ref={descriptionRef} />
        
        </section>
        <div className="h-[12%]">
            <Button variant="secondary">Submit</Button>
        </div>
      </form>
    </main>
    </>
  );
}
