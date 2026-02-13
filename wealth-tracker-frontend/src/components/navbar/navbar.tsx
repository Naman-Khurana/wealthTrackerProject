export default function Navbar(){
    return(
        <main className="w-full h-full flex justify-center items-center">
            <section className="flex justify-between p-[5px] mx-auto rounded-4xl items-center bg-gray-500/50 backdrop-blur-md h-[80%] w-[99%] text-white  ">
                <div>Wealth Tracker</div>
                <div><input type="text" placeholder="search" className="rounded-xl flex justify-center text-white" /></div>
                <div>profile section</div>
            </section>
        </main>
    )
}