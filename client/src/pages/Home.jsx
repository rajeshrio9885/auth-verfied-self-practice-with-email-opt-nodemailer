import React, { useEffect } from 'react'
import {useQuery,useMutation, useQueryClient} from "@tanstack/react-query"
import axios from 'axios'
import { url } from '../constant/constant'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  let {data} = useQuery({queryKey:["authUser"]})
  const navigate = useNavigate()
  const queryclient = useQueryClient()
  const {mutate:logout,isPending} = useMutation({
    mutationKey : ["logout"],
    mutationFn : async()=>{
      try {
        const response = await axios.post(`${url}/logout`,"",{withCredentials:true})
        return response.data
      } catch (error) {
        throw new Error(error.response.data.error)
      }
    },
    onSuccess:()=>{
      toast.success("Logout sucessfully")  
      queryclient.invalidateQueries({queryKey:["authUser"]})
      navigate('*')
    },
    onError : (e)=>{
      toast.error(e.message)
    }
  })


  const submitHandler = ()=>{
    logout()
  }
  return (
    <>
    <div className='bg-[#168f3a67] rounded-sm sm:w-[95%] mx-auto sm:mt-5 h-8 flex items-center justify-between sm:h-14 absolute top-0 left-0 right-0'>
      <p className='font-bold opacity-[1] ml-1 sm:ml-5 text-[#fff]'>Hello {data?.user?.name}</p>
      <p onClick={submitHandler} className='font-bold opacity-[1] mr-1 cursor-pointer sm:mr-5 text-[#fff]'>Log out</p>
    </div>
    <div>
      <h2 className='text-white text-base text-center sm:text-start sm:text-2xl'>Welcome {data?.user?.name}!This is the demo for real world OTP verification for Email and Change Password.</h2>
    </div>
    </>
    
  )
}

export default Home