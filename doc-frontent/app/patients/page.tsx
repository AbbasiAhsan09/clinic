"use client"
import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import AppLayout from '../app-layout';
import Locations from '@/components/location';
import { IPatient } from '@/interfaces/common';
import { PatientService } from '@/services/patient.service';
import { CommonService } from '@/services/common.service';
import { Toast } from 'primereact/toast';
const Patients = () => {
    const toast = useRef<any>(null)
    const [showPatientDialog, setshowPatientDialog] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [patient , setPatient] = useState<IPatient>({});
    const [patients , setPatients] = useState<IPatient[]>([]);
    const [submited, setSubmited] = useState<boolean>(false);
    const genders = CommonService.genders();
    const relations = CommonService.relations();
    const ageFormats = CommonService.getageFormat();
    const openNewDialog = () => {
        setSubmited(false);
        setPatient({});
        setEditMode(false);
        setshowPatientDialog(true);
    }
    const handleEditPatient = (patient:IPatient) => {
        setEditMode(true);
        setshowPatientDialog(true);
        setPatient(patient);
    }
      
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        PatientService.getAll().then(res => setPatients(res.data)).catch(err => console.error("Error: ",err));
    }
    
const onInputChange = (e:React.ChangeEvent<HTMLInputElement> | DropdownChangeEvent ) => {
    const {value , name} = e.target;
    setPatient((prevValues:any) => ({
      ...prevValues,
      [name] : value
    }));
    }
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSubmited(true);
            if(editMode){
                PatientService.edit(patient).then(res => {
                    fetchData();
                    setshowPatientDialog(false);
                    toast.current.show({ severity: 'info', summary: 'Updated', detail: 'Record Updated' });
                 }).catch(err => console.error("Error: ", err));
            }else{
                PatientService.create(patient).then(res => {
                    fetchData();
                    setshowPatientDialog(false);
                    toast.current.show({ severity: 'success', summary: 'Created', detail: 'Record Created' });
                }).catch(err => console.error("Error: ", err));
            }
    }
    const actionTemplate = (rowData:IPatient) => {
        return (
            <>
            <Button  icon="pi pi-pencil" rounded outlined aria-label="Filter" size='small' onClick={() => handleEditPatient(rowData)} />
            <Button size='small' icon="pi pi-calendar-plus" style={{marginLeft : '10px'}} rounded outlined severity="info" aria-label="User" />
            </>
        )
    }

    const rightToolbar = () => {
        return (
            <>
            <Button  icon="pi pi-plus" label='Add New' outlined aria-label="Filter"  size='small' onClick={openNewDialog} /> 
            <Button  icon="pi pi-plus" label='Export' outlined aria-label="Filter" style={{marginLeft : '10px'}} size='small'   /> 
            </>
        );
    }

    const leftToolbar = () => {
        return (
            // <Button  icon="pi pi-plus" label='Add New' outlined aria-label="Filter" size='small' onClick={() => setshowPatientDialog(true)} /> 
            <h1>Patients</h1>
            );
    }
    const ageBody = (rowData : IPatient) => {
        return (
            `${rowData?.age} ${rowData?.ageFormat}`
        )
    }
  return (
   <AppLayout>
     <Toast ref={toast}/>
    <Toolbar left={leftToolbar} right={rightToolbar}></Toolbar>
    <div className='custom-datatable'>
    <DataTable value={patients} paginator rows={5} rowsPerPageOptions={[5, 10, 15, 20, 25, 30]} 
    tableStyle={{width : '100%', textAlign : 'left' , marginTop : '20px'}} size='normal'
      >
        <Column header="Patient Name" field='fullName'></Column>
        <Column header="Relation" field='relation'></Column>
        <Column header="Relative Name" field='relativeName'></Column>
        <Column header="Age" field='age' body={ageBody} style={{textTransform : 'capitalize'}}></Column>
        <Column header="Phone" field='phone'></Column>
        <Column header="Action" body={actionTemplate}></Column>
    </DataTable>

    <Dialog visible={showPatientDialog} onHide={(e:any) => {setshowPatientDialog(false); setEditMode(false)}}
    style={{minWidth : '60rem' , minHeight : '10rem'}}
    header={`${editMode ? 'Edit' : 'Add'} Patient`}>
        <form onSubmit={handleSubmit} >
        <div className="grid grid-cols-2 gap-3 mt-2">
                <InputText placeholder='Patient Full Name' name='fullName' onChange={onInputChange} className='w-full' value={patient?.fullName}/>
                {(submited && !patient?.fullName) && <small className='text-danger'>Fullname is required</small> }
                <Dropdown placeholder='Gender' name='gender' value={patient?.gender} options={genders} onChange={onInputChange} 
                optionLabel='name' optionValue='value' ></Dropdown>
                {(submited && !patient?.gender) && <small className='text-danger'>Gender is required</small> }
            </div> 
            <div className="grid grid-cols-2 gap-3 mt-2">
                <Dropdown placeholder='Select Relation' name='relation' options={relations} onChange={onInputChange} value={patient?.relation} optionLabel='name' optionValue='value'></Dropdown>
                {(submited && !patient?.relation) && <small className='text-danger'>Relation is required</small> }
                <InputText placeholder='Relative Name' className='w-full' name='relativeName' value={patient?.relativeName} onChange={onInputChange}/>
                {(submited && !patient?.relativeName) && <small className='text-danger'>Relative Name is required</small> }
            </div>  
            <div className="grid grid-cols-2 gap-3 mt-2">
                <Dropdown placeholder='Age Format' name='ageFormat' value={patient?.ageFormat} onChange={onInputChange}   options={ageFormats} optionLabel='name' optionValue='value' />
                {(submited && !patient?.ageFormat) && <small className='text-danger'>Age format is required</small> }
                <InputText placeholder='Age' name='age' value={`${patient?.age}`} className='w-full' type='number' onChange={onInputChange} min={1}/>
                {(submited && !patient?.age) && <small className='text-danger'>Age is required</small> }
            </div>  
            <Locations onInputChange={onInputChange} object={patient} submited={false} activeLabels={false}/>   
            <div className="grid grid-cols-2 gap-3 mt-2">
                <InputText placeholder='Email' name='email' className='w-full' value={patient?.email}  onChange={onInputChange}/>
                <InputText placeholder='Phone' name='phone' className='w-full' value={patient?.phone}  onChange={onInputChange}/>
                {(submited && !patient?.phone) && <small className='text-danger'>Phone is required</small> }
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
                <Dropdown placeholder='Refered By' name='referedBy' options={[]} value={patient?.referedBy} onChange={onInputChange} filter optionLabel='name' optionValue='id'/>
                <Dropdown placeholder='Entry Type' name='entryType' value={patient?.entryType} options={['OPD','ER']}   onChange={onInputChange} />
                {/* <InputText placeholder='Phone' className='w-full' /> */}
            </div>  
            
            <div className="mt-4 btn-group flex justify-end gap-2">
                <Button label='Save' type='submit' outlined></Button>    
                <Button label='Cancel' type='button' outlined severity='secondary' onClick={() => setshowPatientDialog(false)}></Button>    
            </div>     
        </form>
    </Dialog>
    </div>
   </AppLayout>
  )
}

export default Patients