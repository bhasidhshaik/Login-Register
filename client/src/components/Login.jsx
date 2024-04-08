import React, { useState } from 'react'
import Email from '../assets/email.png'
import Password from '../assets/password.png'
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form"
import { IoEyeOutline , IoEyeOffOutline  } from "react-icons/io5";


function Login(props) {
    document.title="Login Page";
    const [passVisible , setPassVisible] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors , isSubmitting },
      } = useForm()
    
      const onSubmit = async (data) => {
        try {
          const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          const responseData = await response.text();
          console.log(responseData); // Handle response from the server
          props.setIsLoggedIn(true)
    
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
  return (
    <div className='h-full  bg-emerald-500 '>
    <div className='container flex justify-center align-middle py-20 h-auto'>
        <div className='sm:w-full md:w-96 bg-stone-100 py-8 flex flex-col rounded-2xl '>
        <div className="header">
            <h4 className='text-black text-3xl text-center font-bold tracking-widest'>Login</h4>
        </div>
            <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs flex flex-col items-center gap-10 mt-10">
            <div className="input flex gap-5 items-center">
                <img src={Email} alt="Email Logo" className=' h-5'/>
                <input type="email" name="email" id="email" {...register("email" , {required :{
                    value:true,
                    message : 'Please fill this field'
                }})}  autoComplete='off' placeholder='Enter Email Address' className='outline-none p-2 bg-transparent'/>
            </div>
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            <div className="input flex gap-5 items-center relative">
                <img src={Password} alt="Password Logo" className=' h-5' />
                <input type={passVisible ? "text" : "password"} name="password" {...register("password" , {required :{
                    value : true ,
                    message : 'Please fill this field'
                }})}  id="password" placeholder='Enter Password' className='outline-none border-none p-2 bg-transparent'/>
                <span className=' cursor-pointer absolute right-0' onClick={()=>{setPassVisible(!passVisible)}}>{passVisible ? <IoEyeOffOutline size={22} />: <IoEyeOutline size={22}/>}</span>
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="forgot-pass mt-7 ml-16 mb-10">
            <p className='cursor-pointer text-blue-700 hover:underline'>Forgot Password ?</p>
        </div>
        <div className="submit-container flex flex-col items-center">
            <div className="submit-btn mb-4 w-full px-12">
                <button type="submit" disabled = {isSubmitting} className=" w-full tracking-widest text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{ isSubmitting ? "Please wait.." :"Login"}</button>
            </div>
            <div>
                <p>Don't have an account ?<span className='cursor-pointer text-blue-700 hover:underline'><Link to="/register"> SignUp here..</Link></span></p>
            </div>
        </div>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Login