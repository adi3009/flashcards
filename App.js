import React from 'react';
import {AppRegistry, StyleSheet, View} from 'react-native';
import {name as appName} from './app.json';
import {Appbar, Provider as PaperProvider} from 'react-native-paper';
import DeckList from './components/DeckList';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar/>
        <DeckList/>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50
  }
});

AppRegistry.registerComponent(appName, () => App);