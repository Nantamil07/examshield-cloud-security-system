
"use client";
import { useEffect,useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Dashboard(){
 const [user,setUser]=useState(null);
 useEffect(()=>{ supabase.auth.getUser().then(({data})=>setUser(data.user)); },[]);
 return (<main style={{padding:40}}>
  <h1>Dashboard</h1>
  {user ? <>
    <p>Email: {user.email}</p>
    <p>Role: {user.user_metadata.role}</p>
    <button onClick={async()=>{await supabase.auth.signOut();window.location.href="/login";}}>Logout</button>
  </> : <p>Loading...</p>}
 </main>);
}
