import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ToastRegion } from '../components/ui'
import { getCurrentUser, signOut as authSignOut, signIn as authSignIn, signUp as authSignUp, subscribeToAuthChanges, type InterviewUser } from '../lib/auth'
import { getProfile, saveProfile, type Profile } from '../lib/platform'

type ToastInput={title:string;description?:string;variant?:'success'|'error'|'info'}
type AppContextValue={user:InterviewUser|null;profile:Profile|null;authLoading:boolean;setUser:(user:InterviewUser|null)=>void;refreshProfile:()=>void;updateProfile:(profile:Profile)=>void;signIn:(email:string,password:string)=>Promise<InterviewUser>;signUp:(email:string,password:string,name:string)=>Promise<{user:InterviewUser|null;needsEmailConfirmation:boolean}>;signOut:()=>Promise<void>;toast:(input:ToastInput)=>void}
const AppContext=createContext<AppContextValue|undefined>(undefined)

export default function AppProvider({children}:{children:React.ReactNode}){
 const [user,setUser]=useState<InterviewUser|null>(null)
 const [profile,setProfile]=useState<Profile|null>(null)
 const [authLoading,setAuthLoading]=useState(true)
 const [toasts,setToasts]=useState<Array<{id:string;title:string;description?:string;variant:'success'|'error'|'info'}>>([])

 useEffect(()=>{
   let mounted=true
   getCurrentUser().then(u=>{
     if(!mounted)return
     setUser(u)
     if(u)setProfile(getProfile(u.id,u.name))
     setAuthLoading(false)
   }).catch(()=>{if(mounted)setAuthLoading(false)})
   const unsubscribe=subscribeToAuthChanges(u=>{
     if(!mounted)return
     setUser(u)
     setProfile(u?getProfile(u.id,u.name):null)
     setAuthLoading(false)
   })
   return ()=>{mounted=false;unsubscribe()}
 },[])

 const refreshProfile=useCallback(()=>{if(user)setProfile(getProfile(user.id,user.name))},[user])
 const updateProfile=useCallback((p:Profile)=>{if(user){saveProfile(user.id,p);setProfile(p)}},[user])
 const signIn=useCallback(async(email:string,password:string)=>{const u=await authSignIn(email,password);setUser(u);setProfile(getProfile(u.id,u.name));return u},[])
 const signUp=useCallback(async(email:string,password:string,name:string)=>authSignUp(email,password,name),[])
 const signOut=useCallback(async()=>{await authSignOut();setUser(null);setProfile(null)},[])
 const toast=useCallback((input:ToastInput)=>{const id=`${Date.now()}-${Math.random()}`;setToasts(c=>[...c,{id,title:input.title,description:input.description,variant:input.variant||'info'}]);window.setTimeout(()=>setToasts(c=>c.filter(x=>x.id!==id)),4200)},[])
 return <AppContext.Provider value={{user,profile,authLoading,setUser,refreshProfile,updateProfile,signIn,signUp,signOut,toast}}>{children}<ToastRegion toasts={toasts} onDismiss={id=>setToasts(c=>c.filter(x=>x.id!==id))}/></AppContext.Provider>
}
export function useApp(){const v=useContext(AppContext);if(!v)throw new Error('useApp must be used within AppProvider');return v}
