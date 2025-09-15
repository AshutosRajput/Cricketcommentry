import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, ScrollView } from "react-native";
import EventItem from "../components/EventItem";

const players = [
  "Rohit Sharma", "Virat Kohli", "Shubman Gill", "Shreyas Iyer", "Suryakumar Yadav",
  "KL Rahul", "Hardik Pandya", "Ravindra Jadeja", "Axar Patel", "Jasprit Bumrah", "Mohammed Shami"
];

const mockEvents = [
  { type: "BALL", payload: { runs: 1, commentary: "Pushed to mid-on for a quick single." } },
  { type: "BOUNDARY", payload: { runs: 4, commentary: "Classic cover drive, races to the boundary!" } },
  { type: "WICKET", payload: { playerOut: "R. Sharma", dismissal: "LBW", commentary: "Big appeal... and he's out!" } },
  { type: "MATCH_STATUS", payload: { status: "Innings Break", summary: "Team A finishes on 175/7." } },
];

export default function CommentaryScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });
  const [battingOrder, setBattingOrder] = useState(players);
  const [striker, setStriker] = useState(players[0]);
  const [nonStriker, setNonStriker] = useState(players[1]);

  useEffect(() => {
    let balls = 0;
    const interval = setInterval(() => {
      if (score.wickets === 10 || score.overs >= 20) {
        clearInterval(interval);
        return;
      }

      const event = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      balls++;

      let newOvers = +(score.overs + 0.1).toFixed(1);
      if (newOvers.toString().split(".")[1] === "6") {
        newOvers = Math.floor(newOvers) + 1;
      }

      switch (event.type) {
        case "BALL":
          setScore((prev) => ({ ...prev, runs: prev.runs + event.payload.runs, overs: newOvers }));
          setEvents((prev) => [event, ...prev]);

          if (event.payload.runs! % 2 === 1) {
            setStriker(nonStriker);
            setNonStriker(striker);
          }
          break;

        case "BOUNDARY":
          setScore((prev) => ({ ...prev, runs: prev.runs + event.payload.runs, overs: newOvers }));
          setEvents((prev) => [event, ...prev]);
          break;

        case "WICKET":
          const newWickets = score.wickets + 1;
          const nextBatsman = battingOrder[newWickets + 1];
          setScore({ ...score, wickets: newWickets, overs: newOvers });
          setStriker(nextBatsman);
          setEvents((prev) => [event, ...prev]);
          break;

        case "MATCH_STATUS":
          setEvents((prev) => [event, ...prev]);
          break;

        default:
          setEvents((prev) => [
            { type: "UNKNOWN", payload: { commentary: "Unknown event occurred." } },
            ...prev,
          ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [score, striker, nonStriker]);

  return (
    <ScrollView style={styles.container}>
      {/* Score Header */}
      <View style={styles.header}>
        <Text style={styles.teamScore}>
          India {score.runs}/{score.wickets} ({score.overs.toFixed(1)})
        </Text>
      </View>

      {/* Batting */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Batting</Text>
        <View style={styles.row}>
          <Text style={styles.cell}>{striker} *</Text>
          <Text style={styles.cell}>-</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>{nonStriker}</Text>
          <Text style={styles.cell}>-</Text>
        </View>
      </View>

      {/* Bowling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bowling</Text>
        <View style={styles.row}>
          <Text style={styles.cell}>Jofra Archer *</Text>
          <Text style={styles.cell}>-</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Chris Woakes</Text>
          <Text style={styles.cell}>-</Text>
        </View>
      </View>

      {/* Commentary Feed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Commentary</Text>
        <FlatList
          data={events}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <EventItem event={item} />}
          inverted
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#003366", padding: 12 },
  teamScore: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  section: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  cell: { fontSize: 14 },
});
