"use client"
import React, { useEffect, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { AuthService } from '@/services/auth-service';
import { LocationService } from '@/services/location.service';
import { IClinic, IRegisterUser } from '@/interfaces/common';
import { CommonService } from '@/services/common.service';
import Link from 'next/link';
import Locations from '@/components/location';

const Register = () => {
  const [user, setUser] = useState<IRegisterUser>({businessEmail : '', businessName  : '', ownerEmail : '', gender : '',
  ownerName : '', countryId : 0, stateId : 0, cityId : 0, subscription : '',password : '', dailyPatienstSize : 0, confirmPassword : ''});
  const [submited, setSubmited] = useState<boolean>(false);
  const genders = [{value : 'male', name : 'Male' },{value : 'female', name : 'Female' }];
  const subscriptions = [{name : 'Monthly', value : 'monthly'}, {name : 'Yearly' , value : 'yearly'}];
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
      LocationService.getAllCountries().then(res => {setCountries(res?.data ?? []); console.log(res.data)}).catch((err) => console.error("Error: ",err));
  }, [])

  useEffect(() => {
    LocationService.getStatesByCountryId(user.countryId).then(res => setStates(res?.data ?? [])).catch((err) => console.error("Error: ",err));
    LocationService.getCitiesByStateId(user.stateId).then(res => setCities(res?.data ?? [])).catch((err) => console.error("Error: ",err));
}, [user.countryId, user.stateId])
  
const onInputChange = (e:React.ChangeEvent<HTMLInputElement> | DropdownChangeEvent ) => {
  const {value , name} = e.target;
  setUser((prevValues) => ({
    ...prevValues,
    [name] : value
  }));
  }

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubmited(true);
  const newAccount : IClinic = {
    businessEmail : user.businessEmail, 
    businessName : user.businessName , 
    subscription : user.subscription,
    dailyPatienstSize : user.dailyPatienstSize,
    owner : { 
      email : user.ownerEmail,
      fullName : user.ownerName,
      userType : 'admin',
      cityId : user.cityId,
      countryId : user.countryId,
      stateId : user.stateId,
      password : user.password,
      fatherName : '',
      gender : user.gender
    }
  }
  
  AuthService.createAccount(newAccount).then(res => {
    CommonService.loginWithToken(res.data?.token);
  }).catch(err => {
    console.error("Error : ", err);
});
}
  return (
   <>
   <div className="auth-form">
    <h1 className='text-center my-5 primary-title'>Create an account</h1>
    <hr />
    <form onSubmit={(e)=> handleSubmit(e)}>
    <div className="m-5">
    <div className="grid grid-cols-2 gap-3 mt-4 ">
                <div>
                <label htmlFor="">Business Name</label>
                <InputText placeholder='Business Name' name='businessName' value={user.businessName} onChange={(e) => onInputChange(e)} className='w-full'/>
                {(submited && !user.businessName) && <small className='text-danger'>Business Name Required</small> }
                </div>
                <div>
                <label htmlFor="">Business Email</label>
                <InputText placeholder='Business Email' name='businessEmail' value={user.businessEmail} onChange={(e) => onInputChange(e)} className='w-full'/>
                {(submited && !user.businessEmail) && <small className='text-danger'>Business Email Required</small> }
                </div>
    </div>
    <div className="grid grid-cols-2 gap-3 mt-4 ">
                <div className='grid grid-cols-2 gap-3'>
                <div>
                <label htmlFor="">Owner Name</label>
                <InputText placeholder='Business Name' name='ownerName' value={user.ownerName} onChange={(e) => onInputChange(e)} className='w-full'/>
                {(submited && !user.ownerName) && <small className='text-danger'>Owner Name Required</small> }
                </div>
                <div>
                <label htmlFor="">Gender</label>
                <Dropdown placeholder='Gender' name='gender' value={user.gender} onChange={(e) => onInputChange(e)} 
                options={genders ?? []} className='w-full' optionLabel='name' optionValue='value'/>
                {(submited && !user.gender) && <small className='text-danger'>Please Select Gender</small> }
                </div>
                </div>
                <div>
                <label htmlFor="">Owner Email</label>
                <InputText placeholder='Business Email' name='ownerEmail' value={user.ownerEmail} onChange={(e) => onInputChange(e)} className='w-full'/>
                {(submited && !user.ownerEmail) && <small className='text-danger'>Owner Email Required</small> }
                </div>
    </div>
    <Locations object={user} onInputChange={onInputChange} activeLabels={true} submited={submited}  />
    <div className="grid grid-cols-4 gap-3 mt-4 ">
                <div>
                <label htmlFor="">Daily Patients</label>
                <InputText placeholder='Select Daily Patient' name='dailyPatienstSize' value={`${user.dailyPatienstSize}`} onChange={(e) => onInputChange(e)} className='w-full'/>
                {(submited && !user.dailyPatienstSize) && <small className='text-danger'>Please Select Daily Patient</small> }
                </div>
                <div>
                <label htmlFor="">Subscription</label>
                <Dropdown placeholder='Select Subscription' name='subscription' optionLabel='name' optionValue='value' options={subscriptions} 
                value={user.subscription} onChange={(e) => onInputChange(e)}  className='w-full'/>
                {(submited && !user.subscription) && <small className='text-danger'>Please Select Subscription</small> }
                </div>
                <div>
                <label htmlFor="">Password</label>
                <Password className='w-full' name='password' value={user.password} onChange={(e) => onInputChange(e)}/>
                {(submited && !user.password) && <small className='text-danger'>Password Required</small> }
                </div>
                <div>
                <label htmlFor="">Confirm Password</label>
                <Password className='w-full' name='confirmPassword' value={user.confirmPassword} onChange={(e) => onInputChange(e)}/>
                {(submited && !user.confirmPassword) && <small className='text-danger'>Confirm Password Required</small> }
                </div>
    </div>
    <div className="grid grid-cols-2 gap-3 mt-4">
      <div>
        <Link href={'/auth/login'}>Already registered? </Link>
      </div>
      <div>
        <Button label='Register' type='submit' icon="pi pi-user" className='w-full'/>
      </div>
    </div>
    </div> 
    </form>
   </div>
   </>
  )
}

export default Register