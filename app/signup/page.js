
"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
export default function Signup(){
 const [name,setName]=useState(""); const [email,setEmail]=useState("");
 const [password,setPassword]=useState(""); const [role,setRole]=useState("setter");
 async function signup(){
   const {data,error}=await supabase.auth.signUp({email,password,options:{data:{name,role}}});
   if(error) return alert(error.message);
   alert("Check your email to verify your account.");
 }
 return (<main style={{padding:40}}>
  <h1>Create Account</h1>
  <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/><br/><br/>
  <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><br/><br/>
  <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/><br/>
  <select value={role} onChange={e=>setRole(e.target.value)}>
    <option value="setter">Question Setter</option>
    <option value="reviewer">Reviewer</option>
    <option value="admin">Administrator</option>
    <option value="exam_center">Exam Center</option>
  </select><br/><br/>
  <button onClick={signup}>Sign Up</button>
 </main>);
}
