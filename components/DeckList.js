import React from 'react';
import DeckListItem from './DeckListItem';
import {FlatList, View, StyleSheet} from 'react-native';
import {FAB, TouchableRipple} from 'react-native-paper';

const cards = [
  {id: '1', title: 'deck1', totalCards: 1},
  {id: '2', title: 'deck2', totalCards: 5},
  {id: '3', title: 'deck3', totalCards: 5},
  {id: '4', title: 'deck4', totalCards: 5},
  {id: '5', title: 'deck5', totalCards: 5},
  {id: '6', title: 'deck6', totalCards: 5},
  {id: '7', title: 'deck7', totalCards: 5},
  {id: '8', title: 'deck8', totalCards: 5},
  {id: '9', title: 'deck9', totalCards: 5},
];

const handleOnPress = (navigation, item) => {
  navigation.navigate('DeckView', {
    title: item.title,
    totalCards: item.totalCards
  })
};

const Item = ({item, onPress}) => <TouchableRipple onPress={onPress}>
  <DeckListItem
    title={item.title}
    totalCards={item.totalCards}/>
</TouchableRipple>;

function DeckList({navigation}) {
  return (
    <View>
      <FlatList
        style={styles.list}
        data={cards}
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
    marginBottom: 64
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