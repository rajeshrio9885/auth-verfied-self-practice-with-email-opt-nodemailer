import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";     
import { IoMdMail } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios"
import { url } from '../constant/constant';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';


const Signpage = () => {
    const [currentState,setCurrentState] = useState("login")
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
                const response = await axios.post(`${url}/signin`,data,{withCredentials:true})
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
        }else if(currentState==="login"){
            login()
        }else{
            forgot()
        }
    }
    const queryclient = useQueryClient()
    const {mutate:forgot,isPending:isPendingForgot} =useMutation({
        mutationKey : ["forgot"],
        mutationFn : async()=>{
            try {
                const resetEmail = {
                    email : data.email
                } 
                const response = await axios.post(`${url}/reset-password`,resetEmail,{withCredentials:true})
                if(!response.status==200){
                    throw new Error(response || "Something went wrong")
                }
                return response.data
            } catch (error) {
                console.log(error)
                throw new Error(error.response.data.error)
            }
        },
        onSuccess : ()=>{
            toast.success("Reset Otp send to email")
            setTimeout(()=>{
                navigate("/verify-reset")
            },3000) 
        },
        onError : (e)=>{
            toast.error(e.message)
        }
    })

    const {mutate:login,isPending:pending}=useMutation({
        mutationKey : ["login"],
        mutationFn : async()=>{
            try {
                const loginData = {
                    email : data.email,
                    password : data.password
                } 
                const response = await axios.post(`${url}/login`,loginData,{withCredentials:true})
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
            queryclient.invalidateQueries(["authUser"])
            navigate("/")
        },
        onError : (e)=>{
            toast.error(e.message)
        }
    })
    
  return (
    <div className='background h-auto rounded-xl sm:w-[380px] opacity-[0.9] w-[300px] shadow-2xl z-50 flex items-center flex-col'>
       <h1 className='mt-2 font-extrabold text-2xl'>{currentState==="signin"?"Create Account":currentState==="login"?"Log in":"Forgot Password"}</h1>
       {currentState === "signin" && <div className='bg-[#0f0f0f91] sm:w-[300px] flex p-1 rounded-sm mt-4 justify-center items-center'>
            <span className='font-bold ml-1 text-green-500'><CgProfile/></span>
            <input type="text" name='name' value={data.name} onChange={(e)=>formDetailHandler(e)} className='ml-[4px] w-[100%] cursor-pointer outline-0 text-white font-bold' placeholder='FullName'/>
        </div>}
        <div className='bg-[#0f0f0f91] sm:w-[300px] flex p-1 rounded-sm mt-3 justify-center items-center'>
            <span className='font-bold ml-1 text-green-500'><IoMdMail/></span>
            <input type="text"  name='email' value={data.email} onChange={(e)=>formDetailHandler(e)} className='ml-[4px] w-[100%] cursor-pointer outline-0 text-white font-bold' placeholder='Email'/>
        </div>
        <div className={`${currentState==="forgot" && "hidden"} bg-[#0f0f0f91] sm:w-[300px] flex p-1 rounded-sm mt-3 justify-center items-center`}>
            <span className='font-bold ml-1 text-green-500'><CiLock /></span>
            <input type="password" value={data.password}  name='password' onChange={(e)=>formDetailHandler(e)} className='ml-[4px] w-[100%] cursor-pointer outline-0 text-white font-bold' placeholder='Password'/>
        </div>
        <div className='flex justify-end mt-1 mr-1 w-[79%]'>
           {currentState !== "forgot" ? <p onClick={()=>setCurrentState("forgot")} className='text-white cursor-pointer font-bold text-sm mt-0.5'>Forgot password</p>:<p onClick={()=>setCurrentState("login")} className='text-white font-bold cursor-pointer text-sm mt-0.5'>Back to Log in</p>}
        </div>
        <div className={`sm:w-[300px] w-[80%] rounded-md my-2 ${currentState==="forgot"&&"mb-10"}  bg-green-500 flex justify-center`}>
          {isPending || pending || isPendingForgot ?<p>Loading...</p> : <button className={`text-white font-extrabold p-1.5 cursor-pointer w-full`} onClick={onSubmitHandle}>{currentState==="signin"?"Sign in":currentState==="login"?"Log in":"Reset password"}</button>}
        </div>

       {currentState === "signin" && <div className={`bg-[#0f0f0f91] p-2 rounded-b-md w-full flex justify-center mt-10`}>
            <p className='text-sm sm:text-base text-white font-bold'>Already have an account?<span onClick={()=>setCurrentState("login")} className='text-green-500 cursor-pointer'> Log in</span></p>
        </div>}
        {currentState === "login" && <div className='bg-[#0f0f0f91] p-2 rounded-b-md w-full flex justify-center mt-10'>
            <p className='text-sm sm:text-base text-white font-bold'>Create a new account?<span onClick={()=>setCurrentState("signin")} className='text-green-500 cursor-pointer'> Sign in</span></p>
        </div>}
    </div>
  )
}

export default Signpage