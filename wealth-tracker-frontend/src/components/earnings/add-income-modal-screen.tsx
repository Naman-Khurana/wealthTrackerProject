"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

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
import { useAllEssentialExpensesWithDetails, useAllLuxuryExpensesWithDetails } from "../expenses/expenses-api-fetcher";
import axios from "axios";
import Modal from "../comman/ui/modal";

type props ={
    closeAddIncome : ()=> void;
    isOpen: boolean
}

export default function AddIncomeModal({closeAddIncome,isOpen} : props){
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
  
    
    const categoryList=[...allEssentialExpensesData?.essentialCategories ?? [], ...allLuxuryExpensesData?.luxuryCategories ?? []]
    
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
          closeAddIncome();
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
  <Modal
    isOpen={isOpen}
    onClose={closeAddIncome}
    title="Add Income"
    width="max-w-xl"
  >
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      {/* Income Source */}
      <div className="flex flex-col">   
      <Input
        type="string"
        placeholder="Income Source"
        ref={amountRef}
        required
      />
      </div>

        {/* Income Type */}
        
        
    <ToggleGroup variant="outline" type="single" defaultValue="all" className="h-full"  aria-required>
        <ToggleGroupItem value="Recurring" aria-label="Toggle missed" className="w-full ">
            Recurring
        </ToggleGroupItem>  
        <ToggleGroupItem value="One-time" aria-label="Toggle OneTime" className="w-full ">
            One-time
        </ToggleGroupItem>
      
    </ToggleGroup>

    <section className="flex flex-row justify-center gap-5">
        
    <div className="flex-1">
         <Input
        type="string"
        placeholder="Add Income"
        ref={amountRef} 
        required
      />
    </div>
      
      {/* Date Picker */}
      <div className="flex-1 w-full">
      <Popover open={open}  onOpenChange={setOpen} >
        <PopoverTrigger asChild aria-required >
          <Button
            variant="outline"
            className="justify-start text-left w-full  bg-black/0 text-white/40 font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4 " />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="z-[9999]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleCalenderPop}
          />
        </PopoverContent>
      </Popover>
      </div>
    


    </section>


      

      {/* Description */}
      <Textarea
        placeholder="Enter expense description"
        ref={descriptionRef}
      />

      {/* Submit */}
      <div className="flex justify-end">
       
        <Button variant="outline" type="submit" className="bg-black/1">
          Submit
        </Button>
      </div>
    </form>
  </Modal>
);
}