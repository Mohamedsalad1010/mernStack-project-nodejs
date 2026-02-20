export const ErrorHandles = (error) => {
    if(!error) return null

   
    if(error.response?.data) {
        const data = error.response.data
  console.log('error', data)
         // zod error 
         if(data?.errors && Array.isArray(data.errors)){
            return  data.errors.map(err => err.message).join(',')
         }

        //  single error
        if(data) {
            return data
        }

        // error field

        if(data.error) {
            return data.error
        }
    }

    // error network
    if(error.request && !error.response) {
   return  'network error accured please check your network.'
    }

    // general error 

    if(error.message){
        return error.message
    }

    return 'somthing want  wrong try again'
} 