import React, {useEffect, useState} from 'react';
import DeckListItem from './DeckListItem';
import {FlatList, StyleSheet, View} from 'react-native';
import {FAB, TouchableRipple} from 'react-native-paper';
import {getDecks} from '../utils/api';

const handleOnPress = (navigation, item) => {
  navigation.navigate('DeckView', {
    title: item.title
  })
};

const Item = ({item, onPress}) => <TouchableRipple onPress={onPress}>
  <DeckListItem
    title={item.title}
    totalCards={item.totalCards}/>
</TouchableRipple>;

function DeckList({navigation}) {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getDecks();
      setDecks(Object.values(result).map(deck => ({
        id: deck.title,
        title: deck.title,
        totalCards: deck.questions.length
      })));
    })();
  }, [decks]);

  return (
    <View>
      <FlatList
        style={styles.list}
        data={decks}
        renderItem={({item}) => <Item
          item={item}
          onPress={() => handleOnPress(navigation, item)}/>
        }
        keyExtractor={(item) => item.id}
      />
      <FAB label="New Deck" icon="plus" small style={styles.fab} onPress={() => navigation.navigate('NewDeck')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 64,
    height: '90%'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    marginBottom: 32,
    right: 0,
    bottom: 0
  }
});
export default DeckList