 import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./components/ui/button";


// add task to api task

async  function createTask  (newTask)  {
  const response = await fetch('http://localhost:3000/api/tasks' , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',},
    body: JSON.stringify(newTask),
  })

  if(!response.ok)   throw new Error('failed create task')
    return response.json()
}



 export const Tasks = () => {
    const [task , setTask] = useState('')
   const queryClient = useQueryClient()

    const mutation =  useMutation({
        mutationFn: createTask,
        onSuccess: ()=> {
           queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })

    const handlleAdd  = () => {
         if (!task.trim()) return;

        mutation.mutate({title: task , completed: false})
        console.log('click')

       setTask('')
    }
    return (
<div>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={handlleAdd}>AddTask</button>
      <Button variant="default" size="sm">addTask</Button>
</div>
    ) 


 }