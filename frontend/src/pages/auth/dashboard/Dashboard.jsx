import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardWelcome from '@/components/dashboard/DashboardWelcome'
import TaskForm from '@/components/Tasks/TaskForm'
import TasksList from '@/components/Tasks/TasksList'
import Api from '@/lib/api/ApiClient'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
 
const Dashboard = () => {
  const [ showTaskForm , setShowForm] = useState(false)
  const [isEditTask , setIsEditTask] = useState(null)

  const handleFormClose = () => {
    setShowForm(false); 

  }

  const handleCreateTask= ()=> {
    setShowForm(true)

  }

  // get tasks 

  const taskQuery =  useQuery({
    queryKey: ['tasks'],
    queryFn: async ()=> {
      const response = await Api.get('/tasks')
      return response.data
    },
    retry:1
  })



  if(taskQuery.isLoading){
    <div className='min-h-screen flex items-center justify-center'>
      <Loader className='animate-spin text-primary'/>
    </div>
  }

  if(taskQuery.isError){
    return(
       <div className='min-h-screen flex items-center justify-center'>
     <p className='text-primary'> Error Tasks: {taskQuery.error.message}</p>
    </div>
    )
  }

  const handleEditTasks = (task) => {
    setIsEditTask(task);
    setShowForm(true)
  }

  const handledeleteTask = (taskId) => {
    // Todo taks delete mutation
  }

  const handleChangeStatus = (task , statusData) => {
    // todo status work here
  }
  return (
    <div className='min-h-screen bg-background'>
     {/* header */}
     <DashboardHeader/>
     {/* main content */}
    <main>
       <DashboardWelcome
        showTaskForm={showTaskForm || !!isEditTask}
        onCreateTask={handleCreateTask}
       />

       {/* task lists */}
       <TasksList 
       tasks={taskQuery.data || []}
       isLoading={taskQuery.isLoading}
       onEdit={handleEditTasks}
       onDelete={handledeleteTask}
       onStatusChange={handleChangeStatus}
       
       /> 
    </main>

    {/* task form */}
    <TaskForm
    task={isEditTask}
     open={showTaskForm || !!isEditTask}
     onOpenChange={handleFormClose}
    />
    </div>
  )
}

export default Dashboard
