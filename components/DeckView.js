import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Caption, Surface, Title} from 'react-native-paper';

function DeckView({route, navigation}) {

  const {title, totalCards} = route.params;

  const cards = `${totalCards} ` + (totalCards > 1 ? 'cards' : 'card');

  return (
    <Surface style={styles.surface}>
      <Title>{title}</Title>
      <Caption>{cards}</Caption>
      <Button
        icon="plus"
        mode="contained"
        style={styles.btn}
        onPress={() => navigation.navigate('NewCard')}
      >
        Add Card
      </Button>
      <Button
        icon="radar"
        mode="contained"
        style={styles.btn}
        onPress={() => navigation.navigate('Quiz')}
      >
        Start Quiz
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },
  btn: {
    margin: 8,
    padding: 8
  }
});

export default DeckView;