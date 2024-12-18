import React from 'react'
import Quote from '../components/Quote'
import Auth from '../components/Auth'

function Signup() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
      <Auth type='SignUp'/>
      <Quote/>
    </div>
  )
}

export default Signup