"use client"

import { useState,useRef } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginTemplate(){
    const [rotate,setRotate]=useState(false);
    const [incorrectCredentials,setIncorrectCredentials]=useState(false);
    const [shake,setShake]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    


    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    
    const route= useRouter();

    const handleLogin=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        const email=emailRef.current?.value.trim();
        const password=passwordRef.current?.value;
        if(email==='' || password===''){
            console.log("USERNAME PASSWORD INCOMPLETE");
            setIncorrectCredentials(true);
            setShake(true);
            setTimeout(() => setShake(false),400);
        }
        else{
            axios.post('http://localhost:8080/api/auth/login', {    
                email : email,
                password : password
            },{
                withCredentials: true
            })
            .then(response => {
                route.push('/dashboard');
                console.log(response)
                const test= axios.get("http://localhost:8080/api/"+ response.data.toString() + "/dashboard/",{
                    withCredentials:true
                }).then(res=>{
                    console.log(res)
                }).catch(res=> {
                    console.log(res);
                })

            })
            .catch(error =>{
                console.log("error : ", error);
                setIncorrectCredentials(true);
                setShake(true);
                setTimeout(() => setShake(false),400);
                

            })
            .finally(()=>{
                if(emailRef.current){
                    emailRef.current.value='';
                }
                if(passwordRef.current){
                    passwordRef.current.value='';
                }

                //remove focus from both input bars
                emailRef.current?.blur();
                passwordRef.current?.blur();
            })
        }
    };


    const handleRotateAndRedirect=()=>{
        setRotate(true);
        setTimeout(() =>{
            route.push('/register')
        },400);
    }

    return(
        <main className=" relative h-screen  bg-cover   bg-no-repeat flex justify-center items-center bg-black "
           
        >
            <div 
                className="absolute inset-0 bg-cover bg-center blur-md scale-100 brightness-65 "
                style={{ backgroundImage: "url('/loopvideo7.gif')" }}
            />
            {/* style={{ backgroundImage: "url('/login_bg1.jpg')" }} */}
            {/* backdrop-blur-xs */}
            <form
            className={`w-[40%] relative z-10 h-[80%] backdrop-blur-lg rounded-4xl shadow-2xl border border-white/30 flex flex-col justify-center items-center gap-[20px] transition-all duration-700 transform-gpu `}
            style={{
                transform: rotate ? 'rotateX(180deg) scale(0.95)' : 'rotateX(0deg) scale(1)',
                transformStyle: 'preserve-3d',
                // backfaceVisibility: 'hidden',
                opacity: rotate ? 0 : 1,
                transition: 'transform 0.7s ease, opacity 0.7s ease'
            }}
            onSubmit={(e) => {handleLogin(e)}}
            >
           <h1 className=" font-bold text-white text-[35px] mt-[-55px] mb-[15px] ">Login </h1>
                <div className="relative w-[65%]  ">
                    <p className={`absolute pl-[20px] top-[-20px] text-xs text-red-600 transition-opacity duration-400 ${incorrectCredentials ? "opacity-100" : "opacity-0"} `}>Invalid Email or Password</p>
                    <input
                        type="text"
                        placeholder="Username"
                        ref={emailRef}
                        className={`p-[7px] pl-[20px] pr-[40px] text-white w-full border ${incorrectCredentials ? "border-red-600" : "border-white/30"} ${shake ? "shake" : ""}  rounded-4xl hover:outline-1 transition duration-500  outline-white hover:scale-105`}
                    />
                    <img
                        src="/usericon.png"
                        alt="User Icon"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                    />
                    {/* <p className="pl-[20px] text-red-800 text-xs">Invalid Username</p> */}
                                    
                </div>
                <section className=" w-[65%] flex flex-col justify-center ">
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            ref={passwordRef}
                            className={`p-[7px] pl-[20px] pr-[40px] text-white w-full border ${incorrectCredentials ? "border-red-600" : "border-white/30"}  ${shake ? "shake" : ""} rounded-4xl hover:outline-1 transition duration-500  outline-white hover:scale-105`}
                        />
                        <img
                            src="/passwordicon1.png"
                            alt="User Icon"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 "
                        />
                    </div>
                    <div className="p-[7px]  pr-[40px]">
                        <label className=" text-white/60 checked:text-white text-[12px] top-[43px] flex items-center gap-[2px] hover:scale-105 transition duration-500 ">
                            <input  
                                type="checkbox" 
                                className="scale-90 transition duration-500 accent-purple-500  ease-in-out checked:scale-100"
                                onChange={() =>setShowPassword(prev => !prev)}
                                /> 
                            Show Password
                        </label>
                    </div>
                </section>
                
                <input type="submit" value="Login" className=" bg-white cursor-pointer shadow-md hover:shadow-xl w-[65%] rounded-4xl p-[7px]  hover:scale-105 transition duration-500 hover:bg-purple-700 hover:text-white"/>  
                <p className="text-white text-[12px] mt-[-8px]">Don't have an account yet? <button onClick={handleRotateAndRedirect} className="font-bold inline-block  cursor-pointer   hover:scale-105 transition duration-500">Register</button></p>
            </form>
        
        </main>
    )
}