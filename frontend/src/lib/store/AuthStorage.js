import { create } from "zustand";
import {persist} from 'zustand/middleware'


const useAuthStore = create(
    persist(
        (set , get) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            // set user data  and token  after logid in seccessfully

            setAuth: (userData , token) => set({
                user: userData,
                token,
                isAuthenticated: true
            }),

            // clear set user data 
          clearAuth: () => set({
              user: null,
            token: null,
            isAuthenticated: false,

          }),

        //   get token 

          getToken: () => get().token
        }),

        // store user info
      {
        name: 'auth-store',
        partialize: (state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated
        })
      }
    )
)


export default  useAuthStore