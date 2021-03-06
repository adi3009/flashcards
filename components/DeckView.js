import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Caption, Surface, Title} from 'react-native-paper';
import {getDeck} from '../utils/api';

function DeckView({route, navigation}) {

  const {title} = route.params;

  const [deck, setDeck] = useState(null);

  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    let componentMounted = true;
    (async () => {
      const result = await getDeck(title);
      if (componentMounted) {
        setDeck(result);
        setTotalCards(result.questions.length);
      }
    })();

    return () => componentMounted = false;
  }, [deck]);

  const cards = `${totalCards} ` + (totalCards > 1 ? 'cards' : 'card');

  return (
    <Surface style={styles.surface}>
      <Title>{title}</Title>
      <Caption>{cards}</Caption>
      <Button
        icon="plus"
        mode="contained"
        style={styles.btn}
        onPress={() => navigation.navigate('NewCard', {deckTitle: title})}
      >
        Add Card
      </Button>
      <Button
        icon="radar"
        mode="contained"
        style={styles.btn}
        onPress={() => navigation.navigate('Quiz', {deckTitle: title})}
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