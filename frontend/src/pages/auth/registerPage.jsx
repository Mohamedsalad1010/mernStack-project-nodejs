import React from 'react'
import RegisterForm from '@/components/auth/registerForm'
const registerPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-background '>
      <div className=' absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20 opacity-50'/>

           <div className='z-10 max-w-md w-full px-4 '>
            <div className='mb-8 text-center'>
              <h1 className='text-3xl font-bold text-foreground'>Join us Today</h1>
              <p className='text-gray-600 mt-2'>create an account.</p>

              {/* register form */}
              <RegisterForm/>
            </div>

           </div>
    </div>
  )
}

export default registerPage
