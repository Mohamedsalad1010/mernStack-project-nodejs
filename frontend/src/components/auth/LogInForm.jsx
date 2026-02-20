import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Api from "@/lib/api/ApiClient";
import { ErrorHandles } from "@/utils/ErrorUtils";
import useAuthStore from "@/lib/store/AuthStorage";
const LogInForm = () => {
  const Navigate = useNavigate();
   const [isLoading , setIsLoading] = useState()
    const [error , SetError] = useState(null)
const  {setAuth} = useAuthStore()
   const [formValues , setFormValues] = useState({
      email: '',
      password: ''
    })

  // handle input valuse
  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const logInMutation = useMutation({
    mutationFn: async (credential) => {
      const response = await Api.post('/auth/login' , credential)
       console.log('response data' , response)
      return response.data
    },
    onSuccess: (data) => {
      console.log('data recieved', data)
  // todo login form work

      if(data.token) {
          const token = data.token
          const user = data.user
         setAuth(user , token)
         Navigate('/dashboard')
      }
    },
    onError: (error) => {
      // console.error('data error ', error.response.data)
       SetError(ErrorHandles(error))
    }
  })


  // handle submit

  const handleSubmit = (e) => {
    e.preventDefault()
   SetError(null)
  if(!formValues.email || !formValues.password){
    SetError('all fields required.')
    return
  }

  // todo mutation log in 
logInMutation.mutate({
  email: formValues.email,
  password: formValues.password
})

  }

  return (
    <Card className="w-full border-border mt-4">
      <CardHeader className={"space-y-1 pb-4"}>
        <CardTitle className="text-xl text-center">Sign in</CardTitle>
        <CardDescription>
          Enter your crendials to access your account.
        </CardDescription>

        {/* form register */}
        <CardContent>
          {/* handle error  */}
          {error &&(
      <div className='text-sm text-destructive bg-destructive/10 p-3 rounded-md w-full '>{error}</div>
    )}
          <form onSubmit={handleSubmit}>
            {/* email */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left mt-2">Email</div>
              <Input 
              name="email" 
              placeholder="mc@gamil.com" 
              required
              value={formValues.email}
              onChange={handleInputValues}
              ></Input>
            </div>
            {/* password */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-left mt-2">password</div>
              <Input
                name="password"
                placeholder="******"
                type={"password"}
                required
              value={formValues.password}
              onChange={handleInputValues}
              ></Input>
            </div>

               <div className="mt-10">
            <Button type="submit" className={"w-full  cursor-pointer"}>
              {isLoading ? (
                <span className="flex items-center gap-4">
                  <LoaderCircle />
                  creating account...
                </span>
              ) : (
                "create an acount"
              )}
            </Button>
          </div>
          </form>
         
        </CardContent>

        <CardFooter className={"flex justify-center"}>
          <div className="text-sm text-center">
            Alread i have an account{" "}
            <a
              className=" text-primary hover:underline cursor-pointer"
              onClick={() => Navigate("/register")}
            >
              {" "}
              Sign up
            </a>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default LogInForm;
