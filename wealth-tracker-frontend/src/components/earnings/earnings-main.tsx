export default function EarningsComponent(){
    return(
        <main className="bg-gray-600 w-full h-[99%] rounded-4xl text-white flex ">
            
            
            <section className="h-full w-[70%] bg-blue-800 flex flex-col ">
                <section className="w-full h-[30%] bg-blue-400 flex">
                    <section className="h-full w-[80%] flex">
                        {/* //OVERVIEW SECTION */}
                        <div className="h-full w-[33.34%] bg-indigo-800">TOTAL EXPENSES</div>
                        <div className="h-full w-[33.34%] bg-cyan-800">LUXURY EXPENSES</div>
                        <div className="h-full w-[33.34%] bg-lime-800">ESSENTIAL EXPENSES</div>    
                    </section> 
                    <div className="h-full w-[20%]  flex flex-col">
                        <div className="w-full h-[50%] bg-teal-500">ADD Earnings</div>
                        <div className="w-full h-[50%] bg-slate-500">ADD BUDGET</div>
                    </div>

                </section>
                <section className="w-full h-[45%] bg-purple-800">RECENT TRANSACTIONS</section>
                <section className="w-full h-[25%] flex">
                    <div className="h-full w-[50%] bg-green-800">INSIGHTS<br />
                        Average daily Earnings <br />
                        Most earnings category this month<br />
                        Days left in budget cycle<br />
                    </div>
                    <div className="h-full w-[50%] bg-stone-800">COMPARED TO LAST MONTH</div>
                     


                </section>
            </section>



            <section className="h-full w-[30%] bg-green-800 flex flex-col">
                <div className="w-full h-[50%] bg-orange-800">
                    EARNINGS BY CATEGORY
                </div>
                <div className="w-full h-[50%] bg-pink-800">
                    BUDGET BY CATEGORY
                </div>
            </section>
        </main>
    )
}