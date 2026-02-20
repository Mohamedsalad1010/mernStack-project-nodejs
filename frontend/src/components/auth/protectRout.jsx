import Api from '@/lib/api/ApiClient'
import useAuthStore from '@/lib/store/AuthStorage'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router'

const ProtectRout = ({children}) => {
    const location = useLocation()
    
    const { user , setAuth , clearAuth , token } = useAuthStore()

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

 } , [isSuccess, data, setAuth , token])

 
    if(isLoading){
    return (
        <div className=' min-h-screen flex items-center justify-center'>
            <Loader className='animate-spin'/>
        </div>
    )
}

    if(isError){
        return <Navigate to= '/login' state={{from: location}} replace/>
    }


  return children
}

export default ProtectRout
