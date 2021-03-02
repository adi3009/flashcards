import React from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {expo} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DeckList">
          <Stack.Screen name="Decks" component={DeckList} />
          <Stack.Screen name="DeckView" component={DeckView} options={{title: 'Deck'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  }
});

AppRegistry.registerComponent(expo.name, () => App);