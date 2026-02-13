"use client"


import { useRouter } from "next/navigation";

export default function Menu(){
    
    const route=useRouter();

    
    const menuFields = [
    { 
      name: "Dashboard" ,
      route: "/dashboard/"
    },
    { 
      name: "Expenses" ,
      route: "/expenses"
    },
    
    { 
      name: "Earnings",
      route: "/earnings"  
     },
    {
       name: "Profile" ,
        route: "/profile" 
    },
    
  ];

  const menuButtons = menuFields.map((field) => (
    <button
      key={field.name}
      className="text-white px-4 py-2 w-full text-left hover:bg-white/50 transition-all"
      onClick={()=>route.push(field.route)}
    >
      {field.name}
      
    </button>
  ));
    return(
        <div>
            {menuButtons}
        </div>
    )
}