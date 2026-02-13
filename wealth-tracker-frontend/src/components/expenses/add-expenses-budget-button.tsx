type Props={
    openAddExpenses: ()=> void;
    openAddBudget: ()=> void
}

export default function AddExpensesNBudgetButton( {openAddExpenses,openAddBudget }:Props ){
    const buttonsData=[
        {
            category : "Add Expenses"
        },
        {
            category : "Add Budget"
        }
    ]

    const addButtons=buttonsData.map((element)=>{

        return(
        <button onClick={element.category==="Add Expenses" ? openAddExpenses : openAddBudget} key={element.category} className=" relative h-[40%] text-center w-[90%] bg-black/50 rounded-2xl   flex flex-col justify-center 
            items-center border border-[1px] border-gray-600 shadow-2xl ">
                <div className="absolute top-1 text-white/60 text-[0.8rem] "  >{element.category}</div>
                <div className=" text-[1.8rem] h-[70%]">+</div>
                 
            </button>
    
        )
    })
    return(

        <section className="flex flex-col w-full h-full justify-center items-center gap-2">
            {addButtons}
        </section>
    )
}