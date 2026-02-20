
import Api from '@/lib/api/ApiClient'
import useAuthStore from '@/lib/store/AuthStorage'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router'

 const AdminProtectedRoute = ({children})=> {
 const location = useLocation()
    console.log('location', location)
    const { user , setAuth , clearAuth , token } = useAuthStore()
console.log('user', user)
    const {error , isError , data , isLoading , isSuccess} = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await Api.get('auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        },
        retry: 1 
    })


    useEffect(()=>{
  if(isError){
    clearAuth()
  }
 }, [isError , error , clearAuth])
//   sucees user data


useEffect(()=> {
 if(isSuccess && data){
    setAuth(data , token)
 }

 } , [isSuccess , setAuth , data , token])

 
    if(isLoading){
    return (
        <div className=' min-h-screen flex items-center justify-center'>
            <Loader className='animate-spin'/>
        </div>
    )
}

    if(error){
        return <Navigate to= '/login' state={{from: location}} replace/>
    }
    if(!user) {
      return <Navigate to= '/login' state={{from: location}} replace/>
    }
    
    if(user.role !== 'admin'){
        return <h2>nice try , this page allow only admins .</h2>
    }

    return children
 }

 export default AdminProtectedRoute