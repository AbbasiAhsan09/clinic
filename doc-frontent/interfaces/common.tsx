export interface ILogin{
    email : string;
    password : string;
}

export interface IRegisterUser{
    businessName : string;
    businessEmail : string;
    ownerName : string;
    ownerEmail : string;
    countryId : number;
    stateId : number;
    cityId : number;
    dailyPatienstSize : number | string;
    subscription : string;
    password : string;
    confirmPassword : string;
    gender : string;
  } 
  export interface IUser{
    userType : string;
    fullName : string;
    fatherName ? :string;
    email:string;
    password?:string;
    phone?:string;
    gender?:string;
    cnic ? : string;
    dob? : string;
    opdCharges ?  : number;
    designation? : number;
    speciality ? : number;
    countryId ?: number;
    stateId?  : number;
    cityId? :number;
  
  }
  export interface IClinic{
    businessName: string;
    businessEmail : string;
    subscription : string;
    address ? : string;
    website?:string;
    allowedIp ? : string;
    businessLogo? : string;
    owner : IUser;
    dailyPatienstSize : number | string;
  }
export interface IPatient{
  id? : number;
  fullName ? : string;
  relativeName ? : string;
  relation? : string;
  ageFormat?:string;
  age? : number;
  gender ? : string;
  countryId? :number;
  stateId?:number;
  cityId ? :number;
  email?:string;
  phone?:string;
  referedBy ? :number;
  entryType ? : string;
}