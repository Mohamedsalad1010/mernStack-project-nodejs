import LogInForm from '@/components/auth/LogInForm'
import React from 'react'

const loginPage = () => {
  return (
<div className='min-h-screen flex flex-col items-center justify-center bg-background '>
      <div className=' absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20 opacity-50'/>

           <div className='z-10 max-w-md w-full px-4 '>
            <div className='mb-8 text-center'>
              <h1 className='text-3xl font-bold text-foreground'>Welcome back</h1>
              <p className='text-gray-600 mt-2'>Sign in</p>

              {/* register form */}
              <LogInForm/>
            </div>

           </div>
    </div>
  )
}

export default loginPage
