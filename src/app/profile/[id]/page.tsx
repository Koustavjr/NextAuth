import React from 'react'

export default function ProfilePage({params}:any) {
  return (
    <div>
        
        <h1>Profile Info</h1>
        <p className='p-2 ml-2 rounded bg-orange-500 text-black'>{params.id}</p>


    </div>
  )
}
