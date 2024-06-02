import { setCookie } from "cookies-next";

export const CommonService = {
   
    async loginWithToken(token:any){
        try {
            setCookie('x-auth-token',JSON.stringify(token));
            window.location.href = '/';
        } catch (err) {
            throw err;
        }
    },

    genders(){
        return  [{value : 'male' , name : 'Male'},{value : 'female', name : 'Female'}];
    },
   
    relations(){
        return [{
            value : 'father',
            name : 'Father'
        },{
            value : 'mother',
            name : 'Mother'
        },{
            value : 'brother',
            name : 'Brother'
        },
        {
            value : 'sister',
            name : 'Sister'
        },
        {
            value : 'husband',
            name : 'Husband'
        },
        {
            value : 'wife',
            name : 'Wife'
        },
        {
            value : 'son',
            name : 'Son'
        },
        {
            value : 'daughter',
            name : 'Daughter'
        },{
            value : 'uncle',
            name : 'Uncle'
        },
        {
            value : 'aunt',
            name : 'Aunt'
        },
        {
            value : 'other',
            name : 'Other'
        },]
    },

    getageFormat() {
        return [{value : 'years', name : 'Year(s)'}, {value : 'months', name : 'Month(s)'},{value : 'days' , name : 'Day(s)'}];
    }
}