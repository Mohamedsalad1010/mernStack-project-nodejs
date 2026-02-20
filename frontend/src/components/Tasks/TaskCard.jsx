import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "../ui/badge";
import { Calendar, Edit, Loader, MoreVertical, Trash } from "lucide-react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import Api from "@/lib/api/ApiClient";
import { toast } from "sonner";
const STATUS_CONFIG = {
  pending: {
    variant: "secondary",
    label: "Pending",
    color: "text-yellow-600",
  },
  progress: {
    variant: "default",
    label: "In Progress",
    color: "text-blue-600",
  },
  completed: {
    variant: "outline",
    label: "Completed",
    color: "text-green-600",
  },
};


const TaskCard = ({ key, taskId, task, onEdit, onStatusChange }) => {

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);


  // dueDate Format
const duedateFormat = (dateSring) => {
  if (!dateSring) return null;
  return new Date(dateSring).toLocaleDateString("us-en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// overDueDate format

const overDueDateFormat = (dueDate) => {
  if (!dueDate || task.status === "completed") return false;
  return new Date(dueDate) < new Date();
};

const dueDate = duedateFormat(task.dateDue);

const overDue = overDueDateFormat(task.dateDue);

  const statusConfig = STATUS_CONFIG[task.status] || STATUS_CONFIG["pending"];

  const clientQuery = useQueryClient()
const DeleteMutation = useMutation({
    mutationFn: async () => {
        const response = await Api.delete(`/tasks/${task._id}`)
        return response.data
    },
    onSuccess: () => {
       clientQuery.invalidateQueries(['tasks'])
        toast.success('deleted task successfully.')

    },
    onError: (error) => {
 toast.error(`Error deleting task ${error.message}`)
 console.error('error deletin' , error)
    }
})
  const handleDeleteConfirm = async () =>{
    try {
       await DeleteMutation.mutateAsync(task._id)
    } catch (error) {
        toast.error(`Error delete task falied ${error.message}`)
        console.error(`Error delete task falied ${error.message}`)
    }
  }
  return (
    <div className='mb-6'>
      <Card   className="w-full transition-shadow hover:shadow-md ">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg leading-tight">
              {task?.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={statusConfig.variant} className={"shrink-0"}>
                {statusConfig.label}
              </Badge>
              {/* drop menu like edit and delete */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size={"sm"} className="w-8 h-8 p-0">
                    <span className="sr-only"> open</span>
                    <MoreVertical />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem
                  onClick={() => onEdit(task)}
                  >
                    <Edit />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                  onClick= {()=> setShowDeleteDialog(true)}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        {/* card content */}
        <CardContent className="space-y-3">
          {/* description */}

          {task.description && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {task.description}
            </p>
          )}

          {/* dueDate */}
          { dueDate && (
            <div className="flex items-center gap-2">
         <Calendar className="h-4 w-4 text-muted-foreground" />
         <span className="text-sm text-muted-foreground">Due:</span>
            <Badge variant={overDue ? 'destructive' : 'outline'}>
                   {dueDate}
                   {overDue && ' (overDue) '}
            </Badge>
            </div>
        )}

            {/* Simple status indicator */}

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <span>created: {duedateFormat(task.createdAt)}</span>
        <span className={statusConfig.color}>
            {statusConfig.label}
        </span>
  </div>
        </CardContent>
      </Card>


      {/* alert */}

      <AlertDialog open={showDeleteDialog}  onOpenChange={setShowDeleteDialog}>
         <AlertDialogContent>
            <AlertDialogHeader>
     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
         <AlertDialogDescription>
        This action cannot be undone. This will permanently delete
        <p className="font-bold">{task.title}</p>
      </AlertDialogDescription>
            </AlertDialogHeader>

             <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
          onClick={handleDeleteConfirm}
          >
            {DeleteMutation.isPending ? (
                <div className="flex items-center gap-2">
                    <Loader size={'sm'}/>
                    Deleting..
                </div>
            ): 'Delete'
            }
        
            </AlertDialogAction>
         </AlertDialogFooter>
         </AlertDialogContent>
        
      </AlertDialog>
    </div>
  );
};

export default TaskCard;
