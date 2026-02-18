export default function Navbar(){
    return(
        <main className="w-full h-full flex justify-center items-center">
            <section className="flex justify-between p-[5px] mx-auto  items-center bg-gray-300/10 backdrop-blur-md h-[100%] w-[100%] text-white  ">
                <div>Wealth Tracker</div>
                <div><input type="text" placeholder="search" className="rounded-xl flex justify-center text-white bg-gray-300/20 w-full" /></div>
                <div>profile section</div>
            </section>
        </main>
    )
}