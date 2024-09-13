import { Database } from "./supabase";

export type Event = Database["public"]["Tables"]["events"]["Row"];
export type NearbyEvent =
  Database["public"]["Functions"]["nearby_events"]["Returns"];

export type Attendance = Database["public"]["Tables"]["attendance"]["Row"];
