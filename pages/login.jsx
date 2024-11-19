import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { _loginUser } from "@/store/slice/authSlice";
import { EyeOff, EyeOn } from "@/public/svgs/icons";
import { ClipLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";
import LogoWhite from "@/public/images/logo-white.png";
import styles from "@/styles/auth/auth.module.scss";
import { Checkbox } from "antd/lib";

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function updateFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(_loginUser(formData));

    console.log('done')
  }

  useEffect(() => {
    if (token) router.push("/");
  }, [token]);

  return (
    <div className="flex   w-full h-full bg-cover justify-center">
      <div className="bg-primary py-20 px-16 w-[750px]">
        <p className="text-black font-[900] text-[45px] text-center">
          Login
        </p>
        <p className="text-gray-600 text-center text-3xl font-bold pt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        
        </p>
        <p className="text-blue-600 text-center text-3xl font-bold pt-5">
          {/* "Click HERE To Login As a Contributor" */}
        </p>
        <form onSubmit={handleSubmit} className=" mt-16">
          <p className="font-bold text-2xl text-black mb-1">Enter Username</p>
          <div>
            <input
            name='email'
            type='email'
              className="w-full py-5 px-2 bg-blue-100"
              placeholder="Enter your username or email address"
              value={formData.email}
              onChange={updateFormData}
            />
          </div>
      
        <div className=" mt-10">
          <p className="font-bold text-black text-2xl mb-1">Password</p>
          <div>
            <input
              name="password"
              type={inputType}
              value={formData.password}
              onChange={updateFormData}
              className="w-full py-5 px-2 bg-blue-100"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className='flex justify-between items-center mt-9' >
          <div className="flex items-start">
            <Checkbox />
            <div className="text-gray-600 font-bold pl-2 text-2xl">Remember me
            <p className="'font-semibold text-[13px]">Save my login details for next time</p>
            </div>
          </div>
          <div className="text-red-800 text-[17px] font-bold">
            <p>Forget password ?</p>
          </div>
        </div>
        <div className="mt-16">
          <button className="w-full text-white text-4xl bg-red-800 py-6">Login</button>
        </div>
        <div className='flex justify-between items-center py-16'>
          <div className='bg-gray-400 h-[0.5px] w-full'>
         
            </div>
            <div className='px-4'>
              <p clasName='text-3xl'>OR</p>
            </div>
            <div className='bg-gray-400 h-[0.5px] w-full'>
         
         </div>
        </div>
        <div>
          <button  className="w-full text-black border border-black text-4xl py-6">Sign in With Google</button>
        </div>
        <div>
          <p className='text-center'>Dont have an account? <Link href='/register' className='text-blue-600  text-[16px] mt-4'>Sign up</Link></p>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
