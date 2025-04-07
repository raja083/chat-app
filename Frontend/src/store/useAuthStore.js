// for global state management using zustand
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
export const useAuthStore = create ((set)=>({
    authUser: null, //authorised user
    isSigningUp : false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth : true,
    //while loading the page it will check if the user is authorised (tokens) and meanwhile a loader animation will be there.
    checkAuth : async () =>{
        try {
            const res = await axiosInstance.get("/current-user")
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth", error)
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false});
        }
    },
    signup: async (data) =>{
        set({ isSigningUp: true });
        try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data });
        toast.success("Account created successfully");
        get().connectSocket();
        } catch (error) {
        toast.error(error.response.data.message);
        } finally {
        set({ isSigningUp: false });
        }
    }
}));