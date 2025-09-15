import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const players = [
  { id: 101, name: 'Virat K.' },
  { id: 102, name: 'Pat C.' },
  { id: 103, name: 'Rohit S.' },
];

const events = [
  { playerId: 101, action: '50_RUNS_MILESTONE' },
  { playerId: 102, action: 'TAKE_WICKET' },
  { playerId: 101, action: 'HIT_FOUR' },
  { playerId: 103, action: 'HIT_SIX' },
  { playerId: 101, action: 'HIT_SIX' },
  { playerId: 102, action: 'HIT_FOUR' },
];

const ACTION_POINTS: Record<string, number> = {
  TAKE_WICKET: 20,
  '50_RUNS_MILESTONE': 15,
  HIT_SIX: 2,
  HIT_FOUR: 1,
};

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    calculateLeaderboard();
  }, []);

  const calculateLeaderboard = () => {
    const scores: Record<number, number> = {};

    events.forEach(e => {
      scores[e.playerId] = (scores[e.playerId] || 0) + (ACTION_POINTS[e.action] || 0);
    });

    const result = players.map(p => ({
      ...p,
      score: scores[p.id] || 0,
    }));

    result.sort((a, b) => b.score - a.score);
    setLeaderboard(result);
  };

  const filteredData = showTop
    ? leaderboard.filter(p => p.score >= 20)
    : leaderboard;

  return (
    <View style={styles.container}>
      <Button
        title={showTop ? 'Show All' : 'Toggle Top Performers'}
        onPress={() => setShowTop(!showTop)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f3f3f3' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  rank: { fontWeight: 'bold', width: 30 },
  name: { flex: 1, fontSize: 16 },
  score: { fontWeight: 'bold', fontSize: 16 },
});
