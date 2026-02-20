import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Api from '@/lib/api/ApiClient'
import useAuthStore from '@/lib/store/AuthStorage'
import { toast } from 'sonner'
import { ErrorHandles } from '@/utils/ErrorUtils'
import { Loader } from 'lucide-react'

const TaskForm = ({task , open= true , onOpenChange}) => {
  const [validation , setValidation] = useState(null)
  const [success , setSuccess] = useState(null)
  const [formValues , setFormValue] = useState({
    title: '',
    description: '',
    status: 'pending',
    dateDue: ''
  })



  useEffect(()=>{

    if(task){
      setFormValue({
        title:task.title || " ",
        description: task.description || " ",
        status: task.status || 'pending',
        dateDue: task.dateDue ? new Date(task.dateDue).toISOString().split('T')[0] : ''
      })
    }else{
      setFormValue({
         title: '',
    description: '',
    status: 'pending',
    dateDue: ''
      })
    }
    setValidation(null)
    setSuccess(null)
  }, [task  , open])

  const handleInputChange = (e) => {
    const {name , value} = e.target
   setFormValue({
    ...formValues,
    [name] : value
   })
  }

  const TASK_STATUSES = [
    { value: 'pending', label: 'Pending' },
    { value: 'progress', label: 'progress' },
    { value: 'completed', label: 'Completed' }
];

const handleChangeStatus = (value) =>{
  setFormValue({
    ...formValues,
    status: value
  })
}
const handleCancel = () => {
  onOpenChange?.(false)
}


const queryClient = useQueryClient()

const createMutation = useMutation({
  mutationKey: ['tasks'],
  mutationFn: async (tasksData) => {
    const resonse = await Api.post('/tasks' , tasksData )
    return resonse.data
  },
  onSuccess: (data) => {
    queryClient.invalidateQueries(['tasks'])
   
    onOpenChange?.(false)
      setFormValue({
         title: '',
    description: '',
    status: 'pending',
    dateDue: ''
      })
      setValidation(null)
      setSuccess('create task ')
      
  },
  onError: (error) => {
    console.error('error create task', error)
    toast.error(`error create Tasks ${ErrorHandles(error.message)}` , {description: 'try again please'})
    setValidation(ErrorHandles(error.message))
  }
})


// update muatation
const updateMutation = useMutation({
  mutationFn: async (taskData) => {
    const response = await Api.put(`/tasks/${task._id}` , taskData)
    return response.data
  },
  onSuccess: (data) => {
    toast.success('updated successfully' , data)
    setValidation('update  task successfully.')
     queryClient.invalidateQueries(['tasks'])
     onOpenChange?.(false)
      setFormValue({
         title: '',
    description: '',
    status: 'pending',
    dateDue: ''
      })
  },
  onError: (error) => {
     console.error('error create task', error)
    toast.error(`error create Tasks ${ErrorHandles(error.message)}` , {description: 'try again please'})
    setValidation(ErrorHandles(error.message))
  }
}

)

const handleSubmit = (e) => {
   e.preventDefault()

   if(!formValues.title) {
setValidation('title is required')
   }

   const taskData = {
    title: formValues.title.trim(),
    description: formValues.description.trim() || "",
    status: formValues.status,
    dateDue: formValues.dateDue ?  new Date(formValues.dateDue).toISOString() : null

   }

 if(task){
  updateMutation.mutate(taskData)
 }else{
    createMutation.mutate( taskData)
 }
}

const displayError = validation || ErrorHandles(createMutation.error)
const isLoading = updateMutation.isPending || createMutation.isPending
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className=" sm:max-w-[ 500px]">
        <DialogHeader>
  <DialogTitle className={'text-lg font-semibold'}>
    Add new task
  </DialogTitle>

  <DialogDescription>
    Fill in the Detals below to create a new task.
  </DialogDescription>
        </DialogHeader>


         {/* from */}

    <form  onSubmit={handleSubmit}>

          {displayError && (
                        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                            {displayError}
                        </div>
                    )}
      <div className=' space-y-2 mb-4'> 
   <Label>Title *</Label>
   <Input
   type={'text'}
   name='title'
   value={formValues.title}
   onChange={handleInputChange}
   placeholder='enter task title'
   required
   />
      </div>
      {/* desc */}
       <div className=' space-y-2  mb-4'> 
   <Label >Description </Label>
   <Textarea
   type={'text'}
   name='description'
   value={formValues.description}
   onChange={handleInputChange}
   placeholder='Enter task description'
   />
      </div>

   <div className=' space-y-2  mb-4'> 
     <Label >Status </Label>
    <Select 
    value={formValues.status}
    onValueChange= {handleChangeStatus}
     required
    >
      <SelectTrigger className={'w-full'}>
   <SelectValue placeholder="status"/>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
   {TASK_STATUSES.map(status => (
    <SelectItem key={status.value} value={status.value}> {status.label}</SelectItem>
   ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    
     </div>

       <div className=' space-y-2 mb-4'> 
   <Label>DateDue *</Label>
   <Input
   type={'date'}
   name='dateDue'
   id='dateDue'
   value={formValues.dateDue}
   onChange={handleInputChange}
   placeholder='Enter DateDue task'
    required
   />
      </div>

      {/* actions button */}

      <DialogFooter className={'flex justify-end space-x-2'}>
        <Button type='submit' className={'cursor-pointer'}>
         {isLoading ? (
          <div className='flex items-center gap-2'>
       <Loader/>
       {task? 'updating...' : 'creating...'}
          </div>
         ): ( task ? "updateTask" : "createTask")}
          
          </Button>
        <Button type='button' variant={'outline'} onClick={handleCancel}>cancel</Button>
      </DialogFooter>
    </form>
    </DialogContent>

   
    </Dialog>
  )
}

export default TaskForm
