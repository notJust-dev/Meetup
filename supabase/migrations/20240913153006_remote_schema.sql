create extension if not exists "postgis" with schema "extensions";


create schema if not exists "gis";


alter table "public"."events" add column "location_point" geography(Point,4326);

CREATE INDEX events_geo_index ON public.events USING gist (location_point);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.nearby_events(lat double precision, long double precision)
 RETURNS TABLE(id bigint, created_at timestamp with time zone, title text, description text, date timestamp with time zone, location text, image_uri text, user_id uuid, lat double precision, long double precision, dist_meters double precision)
 LANGUAGE sql
AS $function$
  SELECT 
    id, 
    created_at, 
    title, 
    description, 
    date, 
    location, 
    image_uri, 
    user_id, 
    ST_Y(location_point::geometry) AS lat, 
    ST_X(location_point::geometry) AS long, 
    ST_Distance(location_point, ST_Point(long, lat)::geography) AS dist_meters
  FROM 
    public.events
  ORDER BY 
    location_point <-> ST_Point(long, lat)::geography;
$function$
;

create policy "Enable insert for authenticated users only"
on "public"."events"
as permissive
for insert
to authenticated
with check (true);



