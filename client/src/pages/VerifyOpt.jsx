import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useRef } from 'react'
import { url } from '../constant/constant'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const VerifyOpt = () => {
  const firstInp = useRef()
  const secInp = useRef(null)
  const thirdRef = useRef(null)
  const fourRef = useRef(null)
  const fiveRef = useRef(null)
  const sixRef = useRef(null)

  const navigate = useNavigate()
  const query = useQueryClient()
  const { mutate: otp, isPending } = useMutation({
    mutationKey: ["opt"],
    mutationFn: async (code) => {
      try {
        const response = await axios.post(`${url}/verify-email`, code)
        return response.data
      } catch (error) {
        console.log(error)
        throw new Error(error.response.data.error)
      }
    },
    onSuccess : ()=>{
      toast.success("Login sucessfully")
      navigate("/")
      query.invalidateQueries(["authUser"])
    },
    onError : (e)=>{
      toast.error(e.message)
    }
  })

  const submitOtp = () => {
    const fullCode = firstInp.current.value + secInp.current.value + thirdRef.current.value + fourRef.current.value + fiveRef.current.value + sixRef.current.value
    const code = { code: fullCode }
    otp(code)
    firstInp.current.value = null
    secInp.current.value = null
    thirdRef.current.value = null
    fourRef.current.value = null
    fiveRef.current.value = null
    sixRef.current.value=null
    
  }

  return (
    <div className='z-30 min-w-[250px] sm:min-w-[30vw] px-4 py-3 rounded-lg bg-[#080707b7] flex items-center flex-col'>
      <h1 className='py-2 font-bold text-md sm:text-xl '>Verify Your Email</h1>
      <p className='text-white text-xs sm:text-base sm:my-2 sm:font-bold'>Enter the 6-digitcode sent to your email address</p>
      <div className='flex gap-3 my-6'>
        <input type="number" ref={firstInp} onChange={() => secInp.current.focus()} className='w-7 h-6 sm:w-9 sm:h-9 bg-[#35343491] text-center text-white outline-green-500 rounded-sm' />
        <input type="number" ref={secInp} onChange={() => thirdRef.current.focus()} className='w-7 h-6 sm:w-9 sm:h-9 bg-[#35343491] text-center text-white outline-green-500 rounded-sm' />
        <input type="number" ref={thirdRef} onChange={() => fourRef.current.focus()} className='w-7 h-6 sm:w-9 sm:h-9 bg-[#35343491] text-center text-white outline-green-500 rounded-sm' />
        <input type="number" ref={fourRef} onChange={() => fiveRef.current.focus()} className='w-7 h-6 sm:w-9 sm:h-9 bg-[#35343491] text-center text-white outline-green-500 rounded-sm' />
        <input type="number" ref={fiveRef} onChange={() => sixRef.current.focus()} className='w-7 h-6 sm:w-9 sm:h-9 bg-[#35343491] text-center text-white outline-green-500 rounded-sm' />
        <input type="number" ref={sixRef} className='w-7 h-6 sm:w-9 sm:h-9 bg-[#35343491] text-center text-white outline-green-500 rounded-sm' />
      </div>
      <div className='w-[80%] flex justify-center'>
        {isPending ? <button className='bg-green-500 w-full text-white font-bold rounded-sm mb-5 py-1.5 mt-1'>Loading...</button> : <button onClick={submitOtp} className='bg-green-500 w-full text-white font-bold rounded-sm mb-5 py-1.5 mt-1'>Verify Email</button>}
      </div>
    </div>
  )
}

export default VerifyOpt