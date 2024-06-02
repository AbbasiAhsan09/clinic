"use client"
import { ILogin } from '@/interfaces/common';
import { AuthService } from '@/services/auth-service';
import { CommonService } from '@/services/common.service';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import React, { useState } from 'react'

const Login = () => {
  const [submited, setSubmited] = useState<boolean>(false);
  const [user, setUser] = useState<ILogin>({email : '', password : ''});
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    AuthService.loginAccount(user).then(async (res) => {
      await CommonService.loginWithToken(res.data?.token);
    }).catch(err => console.error("Error :", err));
  }
  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value , name} = e.target;
    setUser((prevValues) => ({
      ...prevValues,
      [name] : value
    }));
    }
  return (
    <div className="auth-form" style={{width : '400px'}}>
    <h1 className='text-center my-5 primary-title'>Login</h1>
    <hr />
    <form onSubmit={(e)=> handleSubmit(e)}>
    <div className="m-5">
    <div className="grid grid-cols-1 gap-3 mt-4 ">
                <div>
                <label htmlFor="">Email</label>
                <InputText placeholder='demo@etc.com' name='email' value={user.email} onChange={(e) => onInputChange(e)} className='w-full'/>
                {(submited && !user.email) && <small className='text-danger'>Email Required</small> }
                </div>
                <div>
                <label htmlFor="">Password</label>
                <Password placeholder='*******'  name='password' toggleMask feedback={false}  value={user.password} 
                onChange={(e) => onInputChange(e)} className={classNames({'w-full' : true})}/>
                {(submited && !user.password) && <small className='text-danger'>Password Required</small> }
                </div>
    </div>
    <div className="grid grid-cols-1 gap-3 mt-4">
     
      <div>
        <Button label='Login' type='submit' icon="pi pi-lock" className='w-full'/>
      </div>
      <div>
        <Link href={'/auth/register'}>Do not have account? </Link>
      </div>
    </div>
    </div> 
    </form>
   </div>
  )
}

export default Login