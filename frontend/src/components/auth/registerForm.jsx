import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import Api from '@/lib/api/ApiClient'
import { ErrorHandles } from '@/utils/ErrorUtils'


const RegisterForm = () => {

    const [formValues , setFormValues] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const [error , SetError] = useState(null)
  const Navigate = useNavigate()

  // handle input valuse
  const handleInputValues = (e) => {
    const {name , value} = e.target
    setFormValues({
     ...formValues,
     [name] : value
    })
}

// create mutation
const registerMutation = useMutation({
  mutationFn: async(userData) =>{
  const response =  await Api.post('/auth/register' , userData)
  console.log('response data' , response)
  return response.data
  },
  onSuccess: (data) => {
    console.log('success data', data)
  },
  onError: (error) => {
    console.error('error' , error)
    
  // SetError(error.response.data.errors.map(err => err.message).join(','))
    SetError(ErrorHandles(error))

  }
    
  
})
// handle submit form
const handleSubmit = (e) => {
  e.preventDefault()
SetError(null)
  if(!formValues.name || !formValues.email || !formValues.password){
    SetError('all fields required.')
    return
  }
  if(formValues.password !== formValues.confirmPassword){
    SetError('password do not match .')
    return
  }

  // TODO: Mutation

  registerMutation.mutate({
    name: formValues.name,
    email: formValues.email,
    password: formValues.password
   
  })
}

  return (
    <Card className="w-full border-border mt-4">
  <CardHeader className={'space-y-1 pb-4'}>
   <CardTitle className="text-xl text-center">
   Create an acoount just few steps
   </CardTitle>
   <CardDescription>
    Enter your details to register
   </CardDescription>

   {/* form register */}
  <CardContent>
    {/* error */}
    {error &&(
      <div className='text-sm text-destructive bg-destructive/10 p-3 rounded-md w-full '>{error}</div>
    )}
  <form onSubmit={handleSubmit}>
    {/* name */}
    <div className='space-y-2'>
        <div className='text-sm font-medium text-left mt-2'>
           Full name
        </div>
        <Input 
         name='name'
         placeholder='enter your full name' 
         required
         value={formValues.name}
         onChange= {handleInputValues}
         >
          
         </Input>
    </div>
    {/* email */}
    <div className='space-y-2'>
        <div className='text-sm font-medium text-left mt-2'>
           Email
        </div>
        <Input 
        name='email' 
        placeholder='mc@gamil.com'
         required
         value= {formValues.email}
         onChange={handleInputValues}
         ></Input>
    </div>
    {/* password */}
    <div className='space-y-2'>
        <div className='text-sm font-medium text-left mt-2'>
          password
        </div>
        <Input 
        name='password'
         placeholder='******' 
         required
         value={formValues.password}
         onChange={handleInputValues}
         type={'password'}
         ></Input>
    </div>
    {/* confirmPassword */}
    <div className='space-y-2'>
        <div className='text-sm font-medium text-left mt-2'>
           confirmPassword
        </div>
        <Input 
        name='confirmPassword' 
        placeholder='*****' 
        required
        value= {formValues.confirmPassword}
        onChange={handleInputValues}
        type={'password'}
        ></Input>
    </div>

  {/* button */}
  <div className='mt-10'>    

<Button type='submit' className={'w-full  cursor-pointer'}>
  {registerMutation.isPending ? (<span className='flex items-center gap-4'><LoaderCircle />creating account...</span>) : 'create an acount'}
</Button>

</div>
   </form>
   
  </CardContent>

    


<CardFooter className={'flex justify-center'}>
    <div className='text-sm text-center'>
        Alread i have an account <a className=' text-primary hover:underline cursor-pointer' onClick={()=> Navigate('/login') }> sign in</a>
    </div>
</CardFooter>
  </CardHeader>
    </Card>
  )
}

export default RegisterForm
