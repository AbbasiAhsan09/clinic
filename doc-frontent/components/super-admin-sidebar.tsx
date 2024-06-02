"use client"
import React ,{ useState} from 'react'
import Image from 'next/image';
const SuperAdminSideBar = () => {
   
    // adjust
  return (
    // <>
    <div className='sidebar-wrapper' >
        <div className='branding'>
           {/* {sidebarWidth.width === '50px' &&  } */}
           <Image src={'next.svg'} alt='70' width={100} height={100}></Image>
           {/* {sidebarWidth.width === '200px' &&  <Image src={'next.svg'} alt='200' width={100} height={100}></Image>} */}
        </div>
        <div className="sidebar-items-wrapper">
            <ul>
                <li>
                    {/* <a href="">
                        <i className="pi pi-home"></i>
                    </a> */}
                </li>
                <li>
                    {/* <a href="">sdf</a> */}
                </li>
            </ul>
        </div>
    </div>
//    </>
  )
}

export default SuperAdminSideBar