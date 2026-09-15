
"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
 async function login(){
   const {error}=await supabase.auth.signInWithPassword({email,password});
   if(error) return alert(error.message);
   window.location.href="/dashboard";
 }
 return (<main style={{padding:40}}>
  <h1>Login</h1>
  <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/><br/>
  <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/><br/>
  <button onClick={login}>Login</button>
 </main>);
}
