import { LocationService } from '@/services/location.service';
import { Dropdown } from 'primereact/dropdown'
import React, { useEffect, useState } from 'react'

const Locations = ({onInputChange,submited,object,activeLabels = false, } : {activeLabels : boolean, onInputChange:any, submited:boolean,object:any}, ) => {
    const [countries, setCountries]= useState<any[]>([]);
    const [states, setStates]= useState<any[]>([]);
    const [cities, setCities]= useState<any[]>([]);
    useEffect(()=>{
        LocationService.getAllCountries().then(res => setCountries(res.data)).catch(err => console.error("Error:", err));
    },[]);

    useEffect(() => {
        LocationService.getStatesByCountryId(object?.countryId).then(res => setStates(res.data)).catch(err => console.error("Error:", err));
    },[object?.countryId])
    
    useEffect(() => {
        LocationService.getCitiesByStateId(object?.stateId).then(res => setCities(res.data)).catch(err => console.error("Error:", err));
    },[object?.stateId])
  return (
    <div className="grid grid-cols-3 gap-3 mt-4 ">
    <div>
    {activeLabels && <label htmlFor="">Country</label>}
    <Dropdown placeholder='Select Country' name='countryId' options={countries}
     onChange={(e) => onInputChange(e)} className='w-full' optionLabel='name' optionValue='id' 
     value={object.countryId}/>
    {(submited && !object.countryId) && <small className='text-danger'>Please Select Country</small> }
    </div>
    <div>
    
    {activeLabels && <label htmlFor="">State</label>}
    <Dropdown placeholder='Select State' name='stateId' value={object.stateId} onChange={(e) => onInputChange(e)} 
    options={states ?? []} className='w-full' optionLabel='name' optionValue='id'/>
    {(submited && !object.stateId) && <small className='text-danger'>Please Select State</small> }
    </div>
    <div>
    {activeLabels && <label htmlFor="">City</label>}
    <Dropdown placeholder='Select City' name='cityId' value={object.cityId} onChange={(e) => onInputChange(e)} 
    options={cities ?? []} className='w-full' optionLabel='name' optionValue='id'/>
    {(submited && !object.cityId) && <small className='text-danger'>Please Select City</small> }
    </div>
</div>
  )
}

export default Locations