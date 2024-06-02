"use client"
import PageTopBar from '@/components/page-topbar'
import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import AppLayout from '../app-layout';
const Doctors = () => {
    const [showPatientDialog, setshowPatientDialog] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const relations = [
         {
            value : 1,
            name : 'Father'
         },
    ]
    const handleEditPatient = (patient:any) => {
        setEditMode(true);
        setshowPatientDialog(true);
    }
    
    const doctors = [
        {
            p_name : 'Ahsan Abbasi',
            g_name: 'Irfan Abbasi',
            age : 20,
            phone : '03113092942',
            city : 'Hyderabad'
        }
    ];

    const actionTemplate = () => {
        return (
            <>
            <Button  icon="pi pi-pencil" rounded outlined aria-label="Filter" size='small' onClick={() => handleEditPatient('daf')} />
            <Button size='small' icon="pi pi-calendar-plus" style={{marginLeft : '10px'}} rounded outlined severity="info" aria-label="User" />
            </>
        )
    }

    const rightToolbar = () => {
        return (
            <>
            <Button  icon="pi pi-plus" label='Add New' outlined aria-label="Filter"  size='small' onClick={() => setshowPatientDialog(true)} /> 
            <Button  icon="pi pi-plus" label='Export' outlined aria-label="Filter" style={{marginLeft : '10px'}} size='small'  /> 
            </>
        );
    }

    const leftToolbar = () => {
        return (
            // <Button  icon="pi pi-plus" label='Add New' outlined aria-label="Filter" size='small' onClick={() => setshowPatientDialog(true)} /> 
            <h1>Doctors</h1>
            );
    }

  return (
    <AppLayout>
        <>
    {/* <PageTopBar title='Patients'/> */}

    <Toolbar left={leftToolbar} right={rightToolbar}></Toolbar>
    <div className='custom-datatable'>
    <DataTable value={doctors} paginator rows={5} rowsPerPageOptions={[5, 10, 15, 20, 25, 30]} 
    tableStyle={{width : '100%', textAlign : 'left' , marginTop : '20px'}} size='normal'
      >
        <Column header="Patient Name" field='p_name'></Column>
        <Column header="Guardian Name" field='g_name'></Column>
        <Column header="Age" field='age'></Column>
        <Column header="Phone" field='phone'></Column>
        <Column header="Action" body={actionTemplate}></Column>
    </DataTable>

    <Dialog visible={showPatientDialog}  onHide={(e:any) => {setshowPatientDialog(false); setEditMode(false)}}
    style={{minWidth : '40rem' , minHeight : '10rem'}}
    header={`${editMode ? 'Edit' : 'Add'} Doctor`}>
        <form action="">
        <InputText placeholder='Doctor Full Name' className='w-full'/>

            <div className="grid grid-cols-2 gap-3 mt-3">
                <InputText placeholder='Father Name' className='w-full'/>
                <InputText placeholder='CNIC No.' className='w-full'/>

            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
                <Dropdown placeholder='Gender'></Dropdown>
                <InputText placeholder='Phone' className='w-full'/>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
                <InputText placeholder='Email' className='w-full' type='email' />
                <InputText placeholder='Date of Birth' className='w-full' type='date' />
            </div>  

            <div className="grid grid-cols-3 gap-3 mt-2">
                <Dropdown placeholder='Country' value={relations} filter optionLabel='name' optionValue='value'></Dropdown>
                <Dropdown placeholder='State' value={relations} filter optionLabel='name' optionValue='value'></Dropdown>
                <Dropdown placeholder='City' value={relations} filter optionLabel='name' optionValue='value'></Dropdown>
            </div>  

            <div className="grid grid-cols-3 gap-3 mt-2">
                <Dropdown placeholder='Designation' value={relations} filter optionLabel='name' optionValue='value'></Dropdown>
                <Dropdown placeholder='Speciality' value={relations} filter optionLabel='name' optionValue='value'></Dropdown>
                <InputText placeholder='OPD Charges'  type='number' min={0}  className='w-full' />
            </div> 
                
            <div className="grid grid-cols-2 gap-3 mt-2">
                <InputText placeholder='Password' className='w-full' type='password' />
                <InputText placeholder='Confirm Password' className='w-full' type='password'/>
            </div>  

            <div className="mt-4 btn-group flex justify-end gap-2">
                <Button label='Save' outlined></Button>    
                <Button label='Cancel' outlined severity='secondary'></Button>    
            </div>     
        </form>
    </Dialog>
    </div>
    </>
    </AppLayout>
  )
}

export default Doctors