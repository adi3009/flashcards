import React from 'react';
import {Button, Surface, TextInput, Title} from 'react-native-paper';
import {StyleSheet} from 'react-native';

function NewDeck() {
  return (
    <Surface style={styles.surface}>
      <Title style={styles.title}>What is the title of your new deck?</Title>
      <TextInput label="Deck Title"/>
      <Button mode="contained" style={styles.btn}>Submit</Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    margin: 8,
    padding: 16,
    elevation: 4,
  },
  btn: {
    marginTop: 16,
    padding: 8
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center'
  }
});

export default NewDeck;