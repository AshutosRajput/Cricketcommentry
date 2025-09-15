import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CommentaryScreen from './screens/CommentaryScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Tab.Navigator  screenOptions={{
                           tabBarStyle: { marginTop: 30 }, // push below status bar
                         }}>
          <Tab.Screen name="Commentary" component={CommentaryScreen} />
          <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
