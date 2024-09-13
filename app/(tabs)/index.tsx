import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import EventListItem from '~/components/EventListItem';
import { NearbyEvent } from '~/types/db';
import { supabase } from '~/utils/supabase';

export default function Events() {
  const [events, setEvents] = useState<NearbyEvent[]>([]);

  useEffect(() => {
    fetchNearbyEvents();
  }, []);

  // const fetchAllEvents = async () => {
  //   const { data, error } = await supabase.from('events').select('*');
  //   setEvents(data);
  // };

  const fetchNearbyEvents = async () => {
    const { data, error } = await supabase.rpc('nearby_events', {
      lat: 41.375637,
      long: 2.163189,
    });
    // console.log(JSON.stringify(data, null, 2));
    // console.log(error);
    if (data) {
      setEvents(data);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />

      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
        className="bg-white"
      />
    </>
  );
}
