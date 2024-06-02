import React from 'react'

const PageTopBar = ({title} : {title : string}) => {
  return (
    <div className='page-top-bar'>
        <h1>{title ?? ''}</h1>
    </div>
  )
}

export default PageTopBar