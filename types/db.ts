import { Database } from "./supabase";

export type Event = Database["public"]["Tables"]["events"]["Row"];
export type Attendance = Database["public"]["Tables"]["attendance"]["Row"];
