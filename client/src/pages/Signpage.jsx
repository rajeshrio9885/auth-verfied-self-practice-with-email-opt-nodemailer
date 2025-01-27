import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";     
import { IoMdMail } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios"
import { url } from '../constant/constant';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';


const Signpage = () => {
    const [currentState,setCurrentState] = useState("signin")
    const [data,setData] = useState({name:"",email:"",password:""})
    const navigate = useNavigate()
   const query =  useQueryClient()
    const formDetailHandler = (e)=>{
        const {name,value} = e.target
        setData({...data,[name]:value})
    }
    const {mutate:signin,isPending}=useMutation({
        mutationKey : ["signin"],
        mutationFn : async()=>{
            try {
                const response = await axios.post(`${url}/signin`,data)
                if(!response.status){
                    throw new Error(response.status || "Something went wrong")
                }
                return response.data
            } catch (error) {
                throw new Error(error.response.data.error)
            }
           
        },
        onSuccess : ()=>{
            toast.success("opt send sucessfully")
            setTimeout(()=>{
                navigate("/otp")
            },3000)
            
        },
        onError : (e)=>{
            toast.error(e.message)
        }
    })

    const onSubmitHandle = (e)=>{
        e.preventDefault();
        if(currentState==="signin"){
            signin()
        }else{
            login()
        }
    }

    const {mutate:login,isPending:pending}=useMutation({
        mutationKey : ["login"],
        mutationFn : async()=>{
            try {
                const loginData = {
                    email : data.email,
                    password : data.password
                } 
                const response = await axios.post(`${url}/login`,loginData)
                if(!response.status){
                    throw new Error(response || "Something went wrong")
                }
                return response.data
            } catch (error) {
                console.log(error)
                throw new Error(error.response.data.error)
            }
           
        },
        onSuccess : ()=>{
            toast.success("Login sucessfully")
            setTimeout(()=>{
                navigate("/")
            },4000)
        },
        onError : (e)=>{
            toast.error(e.message)
        }
    })
   
  return (
    <div className='background h-auto rounded-xl sm:w-[380px] opacity-[0.9] w-[300px] shadow-2xl z-50 flex items-center flex-col'>
       <h1 className='mt-2 font-extrabold text-2xl'>{currentState==="signin"?"Create Account":"Log in"}</h1>
       {currentState === "signin" && <div className='bg-[#0f0f0f91] sm:w-[300px] flex p-1 rounded-sm mt-4 justify-center items-center'>
            <span className='font-bold ml-1 text-green-500'><CgProfile/></span>
            <input type="text" name='name' value={data.name} onChange={(e)=>formDetailHandler(e)} className='ml-[4px] w-[100%] cursor-pointer outline-0 text-white font-bold' placeholder='FullName'/>
        </div>}
        <div className='bg-[#0f0f0f91] sm:w-[300px] flex p-1 rounded-sm mt-3 justify-center items-center'>
            <span className='font-bold ml-1 text-green-500'><IoMdMail/></span>
            <input type="text"  name='email' value={data.email} onChange={(e)=>formDetailHandler(e)} className='ml-[4px] w-[100%] cursor-pointer outline-0 text-white font-bold' placeholder='Email'/>
        </div>
        <div className='bg-[#0f0f0f91] sm:w-[300px] flex p-1 rounded-sm mt-3 justify-center items-center'>
            <span className='font-bold ml-1 text-green-500'><CiLock /></span>
            <input type="password" value={data.password}  name='password' onChange={(e)=>formDetailHandler(e)} className='ml-[4px] w-[100%] cursor-pointer outline-0 text-white font-bold' placeholder='Password'/>
        </div>
        <div className={`sm:w-[300px] w-[80%] rounded-md mt-4  bg-green-500 flex justify-center`}>
          {isPending || pending ?<p>Loading...</p> : <button className='text-white font-extrabold p-1.5 cursor-pointer w-full' onClick={onSubmitHandle}>{currentState==="signin"?"Sign in":"Log in"}</button>}
        </div>

       {currentState === "signin" && <div className='bg-[#0f0f0f91] p-2 rounded-b-md w-full flex justify-center mt-10'>
            <p className='text-sm sm:text-base text-white font-bold'>Already have an account?<span onClick={()=>setCurrentState("login")} className='text-green-500 cursor-pointer'> Log in</span></p>
        </div>}
        {currentState === "login" && <div className='bg-[#0f0f0f91] p-2 rounded-b-md w-full flex justify-center mt-10'>
            <p className='text-sm sm:text-base text-white font-bold'>Create a new account?<span onClick={()=>setCurrentState("signin")} className='text-green-500 cursor-pointer'> Sign in</span></p>
        </div>}
    </div>
  )
}

export default Signpage