import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import events from '~/assets/events.json';

export default function EventPage() {
  const { id } = useLocalSearchParams();

  const event = events.find((e) => e.id === id);

  return <Text>Event title: {event?.title} </Text>;
}
