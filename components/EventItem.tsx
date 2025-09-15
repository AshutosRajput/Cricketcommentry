import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function EventItem({ event }: { event: any }) {
  switch (event.type) {
    case 'BALL':
      return <Text style={styles.ball}>{event.payload.commentary}</Text>;
    case 'BOUNDARY':
      return <Text style={styles.boundary}>🏏 {event.payload.commentary}</Text>;
    case 'WICKET':
      return (
        <Text style={styles.wicket}>
           {event.payload.commentary} ({event.payload.playerOut} - {event.payload.dismissal})
        </Text>
      );
    case 'MATCH_STATUS':
      return (
        <Text style={styles.matchStatus}>
           {event.payload.status}: {event.payload.summary}
        </Text>
      );
    default:
      return (
        <Text style={styles.unknown}>
           Unknown event: {JSON.stringify(event.payload)}
        </Text>
      );
  }
}

const styles = StyleSheet.create({
  ball: { fontSize: 16, marginVertical: 4 },
  boundary: { fontSize: 16, marginVertical: 4, color: 'green', fontWeight: 'bold' },
  wicket: { fontSize: 16, marginVertical: 4, color: 'red', fontWeight: 'bold' },
  matchStatus: { fontSize: 16, marginVertical: 4, color: 'blue', fontWeight: 'bold' },
  unknown: { fontSize: 16, marginVertical: 4, fontStyle: 'italic', color: 'gray' },
});
