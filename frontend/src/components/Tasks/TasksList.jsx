import { ClipboardCheck, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Badge } from '../ui/badge'
import TaskCard from './TaskCard'

const TasksList = ({ tasks=  [], isLoading= false, onEdit , onDelete , onStatusChange}) => {
const [searchTerm , setSearchTerm] = useState('')

// task search
const tasksFilter = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || (task.description && task.description.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    return matchesSearch
})
    const getStatus = () => {
        const allTasksStatus = { 
            total: tasks.length,
         pending  :tasks.filter(task => task.status === "pending").length,
         progress : tasks.filter(task => task.status === "progress").length,
         completed : tasks.filter(task => task.status === "completed").length
        }

        const categorizedTasks = {
            all: tasksFilter,
        pending  :tasksFilter.filter(task => task.status === "pending"),
         progress : tasksFilter.filter(task => task.status === "progress"),
         completed : tasksFilter.filter(task => task.status === "completed")
        }
        const stats = {
            total: allTasksStatus.total,
            pending: allTasksStatus.pending,
            progress: allTasksStatus.progress,
            completed: allTasksStatus.completed
        }
        return {stats , categorizedTasks}
    }

    const {stats , categorizedTasks} = getStatus()


    const TaskGrid = ({ tasks, emptyMessage }) => {

        if (tasks.length === 0) {
            return (
                <div className="text-center py-12">
                    <div className="mx-auto max-w-md">
                        <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-sm font-medium text-foreground">No tasks found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={onEdit}
                            onStatusChange={onStatusChange}
                        />
                    ))
                }
            </div>
        )
    }
  return (
    <div className=' mt-3 space-y-4 space-x-2 px-2'>
       {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                 <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Total</p>
                        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                 </div>
                 <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Pending</p>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>

                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{stats.progress}</p>
                </div>

                 <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">Completed</p>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>

            </div>

            {/* search input  */}
            <div className='flex items-center gap-4'> 
                <div className=' relative flex-1 sm:w-full md:max-w-md'>
 <Search className='absolute left-3  top-1/2  transform -translate-y-1/2 h-4 w-4 text-muted-foreground'/>
                    <Input
                    type={'text'}
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    placeholder='search task'
                    className={'pl-10'}
                    />

                </div>

            </div>

            {/* tabs task section */}

            <Tabs defaultValue= 'all' className='w-full'>
              <TabsList className={'grid grid-cols-4 w-full'}>
                <TabsTrigger value='all' className={'flex items-center gap-2'}>
                    All
                    <Badge variant='secondry'>{stats.total}</Badge>
                    </TabsTrigger>
                    
                     <TabsTrigger value='pending' className={'flex items-center gap-2'}>
                   Pending
                    <Badge variant='secondry'>{stats.pending}</Badge>
                    </TabsTrigger>
                     <TabsTrigger value='progress' className={'flex items-center gap-2'}>
                   In progress
                    <Badge variant='secondry'>{stats.progress}</Badge>
                    </TabsTrigger>
                     <TabsTrigger value='completed' className={'flex items-center gap-2'}>
                Completed
                    <Badge variant='secondry'>{stats.completed}</Badge>
                    </TabsTrigger>
              </TabsList>

              <TabsContent value= 'all'>
                <TaskGrid
                tasks={categorizedTasks.all}
                 emptyMessage="No Tasks tasks found."
                />
                 </TabsContent>
              <TabsContent value= 'pending'>  <TaskGrid
                tasks={categorizedTasks.pending}
                 emptyMessage="No Pending tasks found."
                /></TabsContent>
              <TabsContent value= 'progress'>
                 <TaskGrid
                tasks={categorizedTasks.progress}
                 emptyMessage="No Progress tasks found."
                />
              </TabsContent>
              <TabsContent value= 'completed'>
                 <TaskGrid
                tasks={categorizedTasks.completed}
                 emptyMessage="No Completed tasks found."
                />
              </TabsContent>

            </Tabs>
    </div>
  )
}

export default TasksList
