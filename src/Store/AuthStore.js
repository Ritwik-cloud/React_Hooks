import { create } from "zustand";

export const useTokenStore = create((set,get)=>(
    {
        token: null,
        setToken: ()=>set({ token: localStorage.getItem("token") }),
    }
));