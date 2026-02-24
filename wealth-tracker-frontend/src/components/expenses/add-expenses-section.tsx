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
import Modal from "../comman/ui/modal";

type props ={
    closeAddExpenses : ()=> void;
    isOpen: boolean
}



export default function AddExpensesSection({closeAddExpenses ,isOpen} : props) {
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
  <Modal
    isOpen={isOpen}
    onClose={closeAddExpenses}
    title="Add Expense"
    width="max-w-xl"
  >
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      {/* Amount */}
      <Input
        type="number"
        placeholder="Enter amount"
        ref={amountRef}
      />

      {/* Category */}
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>

        <SelectContent className="z-[9999]">
          <SelectGroup>
            {categoryfields}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Date Picker */}
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild >
          <Button
            variant="outline"
            className="justify-start text-left"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
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

      {/* Description */}
      <Textarea
        placeholder="Enter expense description"
        ref={descriptionRef}
      />

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>
  </Modal>
);
}
