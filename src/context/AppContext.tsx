import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ToastRegion } from '../components/ui'
import { getCurrentUser, signOut as authSignOut, signIn as authSignIn, type InterviewUser } from '../lib/auth'
import { getProfile, saveProfile, type Profile } from '../lib/platform'

type ToastInput={title:string;description?:string;variant?:'success'|'error'|'info'}
type AppContextValue={user:InterviewUser|null;profile:Profile|null;authLoading:boolean;setUser:(user:InterviewUser|null)=>void;refreshProfile:()=>void;updateProfile:(profile:Profile)=>void;signIn:(email:string,name:string)=>InterviewUser;signOut:()=>void;toast:(input:ToastInput)=>void}
const AppContext=createContext<AppContextValue|undefined>(undefined)
export default function AppProvider({children}:{children:React.ReactNode}){
 const [user,setUser]=useState<InterviewUser|null>(null); const [profile,setProfile]=useState<Profile|null>(null); const [authLoading,setAuthLoading]=useState(true)
 const [toasts,setToasts]=useState<Array<{id:string;title:string;description?:string;variant:'success'|'error'|'info'}>>([])
 useEffect(()=>{const u=getCurrentUser();setUser(u);if(u)setProfile(getProfile(u.id,u.name));setAuthLoading(false)},[])
 const refreshProfile=useCallback(()=>{if(user)setProfile(getProfile(user.id,user.name))},[user])
 const updateProfile=useCallback((p:Profile)=>{if(user){saveProfile(user.id,p);setProfile(p)}},[user])
 const signIn=useCallback((email:string,name:string)=>{const u=authSignIn(email,name);setUser(u);setProfile(getProfile(u.id,u.name));return u},[])
 const signOut=useCallback(()=>{authSignOut();setUser(null);setProfile(null)},[])
 const toast=useCallback((input:ToastInput)=>{const id=`${Date.now()}-${Math.random()}`;setToasts(c=>[...c,{id,title:input.title,description:input.description,variant:input.variant||'info'}]);window.setTimeout(()=>setToasts(c=>c.filter(x=>x.id!==id)),4200)},[])
 return <AppContext.Provider value={{user,profile,authLoading,setUser,refreshProfile,updateProfile,signIn,signOut,toast}}>{children}<ToastRegion toasts={toasts} onDismiss={id=>setToasts(c=>c.filter(x=>x.id!==id))}/></AppContext.Provider>
}
export function useApp(){const v=useContext(AppContext);if(!v)throw new Error('useApp must be used within AppProvider');return v}
