import useAuthStore from '@/lib/store/AuthStorage'
import { ClipboardCheck } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

const DashboardHeader = () => {
  const { user, clearAuth} = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const handleLogOut = () => {
    if(confirm('Are you sure to logout?')) {
      clearAuth();
      queryClient.clear()
     navigate('/login', {replace: true})
    }
  }
  return (
    <div className='bg-card border-b border-border shadow-sm'>
      <div className='w-full px-4 py-4 flex items-center justify-between'>

        <div className='flex items-center gap-3'>
           <div className=' flex h-8 w-8  items-center justify-center rounded-lg'>
            <ClipboardCheck className='h-4 w-4 text-primary'/>
           </div>
           <div>
            <h2 className=' text-xl font-semibold text-foreground'>Tasks Dashboard</h2>
           </div>
        </div>

        <div>
   
 <div className='flex items-center gap-3'>
<span className='text-sm text-muted-foreground'>
  welcome , <span className='font-medium text-foreground'>{user?.name || "User"}</span>
</span>

 <Button className='text-foreground cursor-pointer' variant={'outline'} onClick={handleLogOut}>
  logout
 </Button>

 </div>


         
        </div>

      </div>
    </div>
  )
}

export default DashboardHeader
