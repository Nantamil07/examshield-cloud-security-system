
import { supabase } from "./supabase";
export const getCurrentUser = async()=> (await supabase.auth.getUser()).data.user;
export const logout = async()=> supabase.auth.signOut();
