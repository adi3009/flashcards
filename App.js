import React, {useEffect} from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {expo} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';
import NewDeck from './components/NewDeck';
import NewCard from './components/NewCard';
import QuizView from './components/QuizView';
import AppNotification from './utils/notification';

const Stack = createStackNavigator();

export default function App() {

  const onNotification = () => {
    console.log('notification received');
  };

  useEffect(() => {
    let componentMounted = true;
    let listener;
    (async () => {
      if (componentMounted) {
        /*let time = new Date();
        time.setMinutes(time.getMinutes() + 2);*/
        AppNotification.schedule();
        AppNotification.onNotification(onNotification);
      }
    })();

    return () => {
      componentMounted = false;
      listener && listener.remove();
    }
  });

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DeckList">
          <Stack.Screen name="Decks" component={DeckList} />
          <Stack.Screen name="DeckView" component={DeckView} options={{title: 'Deck'}}/>
          <Stack.Screen name="NewDeck" component={NewDeck} options={{title: 'New Deck'}}/>
          <Stack.Screen name="NewCard" component={NewCard} options={{title: 'Add Card'}}/>
          <Stack.Screen name="Quiz" component={QuizView} options={{title: 'Quiz'}}/>
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