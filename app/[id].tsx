import dayjs from 'dayjs';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Text, View, Image } from 'react-native';

import events from '~/assets/events.json';

export default function EventPage() {
  const { id } = useLocalSearchParams();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return <Text>Event not found</Text>;
  }

  return (
    <View className="flex-1 gap-3 bg-white p-3">
      <Stack.Screen
        options={{ title: 'Event', headerBackTitleVisible: false, headerTintColor: 'black' }}
      />

      <Image source={{ uri: event.image }} className="aspect-video w-full rounded-xl" />

      <Text className="text-3xl font-bold" numberOfLines={2}>
        {event.title}
      </Text>
      <Text className="text-lg font-semibold uppercase text-amber-800">
        {dayjs(event.datetime).format('ddd, D MMM')} · {dayjs(event.datetime).format('h:mm A')}
      </Text>

      <Text className="text-lg" numberOfLines={2}>
        {event.description}
      </Text>
    </View>
  );
}
