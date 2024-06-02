"use client"
import React from 'react'
import Image from 'next/image';
import { navigation } from '@/utils/navigation';
import Link from 'next/link';
        
import { usePathname } from 'next/navigation'
const SideBarComp = () => {
  const path = usePathname();
  console.log(path);
  
    const renderNaviationLinks = () => {
        return (
            <ul>
                {navigation.map((nav) => {
                    return(
                        <li title={nav.title}  className={path === nav.link ? 'active' : ''} key={nav.link}>
                            <Link href={nav.link} >
                                <i className={`${nav.icon}`}></i>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
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
           {renderNaviationLinks()}
        </div>
    </div>
//    </>
  )
}

export default SideBarComp