import { EllipsisVertical ,Pencil,X,Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type NExpensesDataType={
    category : string;
    amount : number;
    date : string;
}

export default function RecentTransactionRowTemplate(props: NExpensesDataType){

    return(
    <section className="w-full h-[22%] p-2 flex justify-between items-center border-b border-gray-600 shadow-2xl  transition-all duration-300 ease-in-out text-white/50 ">            
                <section className="flex gap-5 w-[35%]">
                <div >Image</div>
                <div className="text-center text-white">{props.category} </div>
                </section>
    
                <div className="w-[30%] ">{props.date} </div>
                
                <div className="w-[20%] text-green-200/80 font-normal ">₹ {props.amount} </div>
                <div className="w-[5%]">
                    
                    <DropdownMenu >
                        <DropdownMenuTrigger><EllipsisVertical className='w-[60%] hover:scale-[125%]  transition duration-250 '/></DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-black text-white/60 transition duration-200">
                            <DropdownMenuItem className='transition duration-200' > 
                                <Pencil />
                                    <div> Edit Expense</div>

                                </DropdownMenuItem>
                            <DropdownMenuItem className='transition duration-200'>
                                <X />
                                <div>Delete Expense</div>
                                </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </section>
        )
}