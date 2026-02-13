"use client"
import axios from "axios";
import { useState,useRef } from "react"
import { useRouter } from "next/navigation"
import { ifError } from "assert";

export default function RegisterUserTemplate(){
    const [rotate,setRotate]=useState(false);
    const [invalidDetails,setInvalidDetails]=useState(false);
    const [shake,setShake]=useState(false);
    const  [errorMessage,setErrorMessage]=useState("");
    

    const inputClasses=`p-[7px] pl-[20px] pr-[40px] text-white w-full border border-white/30 rounded-4xl hover:outline-1 transition duration-500 outline-white hover:scale-105`;

    const firstNameRef=useRef<HTMLInputElement>(null);
    const lastNameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);

    const route=useRouter();

    const inputFieldsData=[
        {
            placeholder : "First Name",
            icon: "/idcard.png",
            type: "text",
            ref: firstNameRef
        },
        {
            placeholder : "Last Name",
            icon: "/idcard.png",
            type: "text",
            ref: lastNameRef
        },
        {
            placeholder : "Username",
            icon: "/usericon.png",
            type: "text",
            ref: emailRef
        },
        {
            placeholder : "Password",
            icon: "/idcard.png",
            type: "password",
            ref: passwordRef
        }
    ]

    const inputFields=inputFieldsData.map((fields) =>(
        <div className="relative w-full">
            <input
                type={fields.type}
                placeholder={fields.placeholder}
                ref={fields.ref}
                className={inputClasses}
            />
            <img
                src={fields.icon}
                alt="icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w- h-4"
            />
        </div>
    ))

    const handleRegisterUser=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const firstName=firstNameRef.current?.value.trim();
        const lastName=lastNameRef.current?.value.trim();
        const email=emailRef.current?.value.trim();
        const password=passwordRef.current?.value;

        if(firstName==='' || lastName===''|| email==='' || password===''){
            console.log("Incomplete Details.")
             
            setInvalidDetails(true);
            setShake(true);
            setTimeout(() => setShake(false),400);
            setErrorMessage("Fill All Details!!");
        }else{
            axios.post('http://localhost:8080/api/auth/register', {    
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : password
            })
            .then(response => {
                route.push('/login  ');

            })
            .catch(error =>{
                console.log("error : ", error);
                setInvalidDetails(true);
                setShake(true);
                setTimeout(() => setShake(false),400);
                if (error.response) {
                    const data = error.response.data;
                    
                    // You can customize this further, but this shows the first available error
                    const firstErrorKey = Object.keys(data)[0];
                    const message = data[firstErrorKey];
                    setErrorMessage(message); // will be something like "Invalid Email Format."
                } else {
                    setErrorMessage("Something went wrong. Please try again.");
                }
                        })

                    }
                    
                }

    const handleRotateAndRedirect=()=>{
        setRotate(true);
        setTimeout(() =>{
            route.push('/login')
        },400);
    }
    return(
        <main className=" relative h-screen bg-cover   bg-no-repeat flex justify-center items-center bg-black "
           
        >
            <div 
                className="absolute inset-0 bg-cover brightness-65 bg-center blur-md scale-100 bg-no-repeat"
                style={{ backgroundImage: "url('/loopvideo7.gif')" ,
                        
                 }}
            />
        <form
            className={`w-[40%] relative z-10 h-[90%] backdrop-blur-lg rounded-4xl shadow-2xl border border-white/30 flex flex-col justify-center items-center gap-[25px] transition-all duration-700 transform-gpu  `}
            style={{
                transform: rotate ? 'rotateX(180deg)' : 'none',
                transformStyle: 'preserve-3d',
                // backfaceVisibility: 'hidden',
                opacity: rotate ? 0 : 1,
                transition: 'transform 0.7s ease, opacity 0.7s ease'
            }}
            onSubmit={(e) =>handleRegisterUser(e)}
        >                
                <h1 className="font-bold  text-[35px] text-white   ">New User</h1>
                <main className="w-full flex flex-col items-center gap-[4px]">
                
                <section className="relative flex flex-col items-center w-[65%] gap-[15px]">
                    {inputFields}
                    
                    
                </section>
                <p className={`absolute w-full bottom-30 font-[600] text-xs text-left pl-[100px]  ${invalidDetails ? "text-red-700 opacity-100" : "opacity-0" } ${shake ? "shake" : ""} `}>{errorMessage}</p>
                </main>

                <section className="flex flex-col w-[65%]  items-center gap-[15px]">
                    <input type="submit" value="Register" className=" w-full  cursor-pointer bg-white  hover:bg-purple-700 shadow-md hover:shadow-xl  rounded-4xl p-[7px] hover:scale-105 hover:bg-black transition duration-500 hover:text-white"/>  
                    <button onClick={handleRotateAndRedirect}  className=" w-full   bg-white hover:bg-blue-700 cursor-pointer  shadow-md hover:shadow-xl  rounded-4xl p-[7px] hover:scale-105 transition duration-500 hover:text-white"> Existing User?</button>  
                </section>
            </form>
        </main>
    )
}















{/* <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="First Name"
                            ref={firstNameRef}
                            className={inputClasses}
                        />
                        <img
                            src="/idcard.png"
                            alt="User Icon"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w- h-4"
                        />
                    </div>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Last-Name"
                            ref={lastNameRef}
                            className={inputClasses}
                        />
                        <img
                            src="/idcard.png"
                            alt="User Icon"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 "
                        />
                    </div>

                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Username"
                            ref={emailRef}
                            className={inputClasses}
                        />
                        <img
                            src="/usericon.png"
                            alt="User Icon"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                        />
                    </div>
                    <div className="relative w-full ">
                        <input
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                            className={inputClasses}
                        />
                        <img
                            src="/passwordicon1.png"
                            alt="User Icon"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 "
                        />
                    </div> */}