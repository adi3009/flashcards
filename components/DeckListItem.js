import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

function DeckListItem({title, totalCards}) {
  const cards = `${totalCards} ` + (totalCards > 1 ? 'cards' : 'card');

  return (
    <Card style={styles.item}>
      <Card.Title title={title} subtitle={cards} />
    </Card>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 8,
    margin: 8,
  }
});

export default DeckListItem;