import React from 'react';
import DeckListItem from './DeckListItem';
import {FlatList} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

const cards = [
  {id: '1', title: 'card1', totalCards: 1},
  {id: '2', title: 'card2', totalCards: 5},
  {id: '3', title: 'card3', totalCards: 5},
  {id: '4', title: 'card4', totalCards: 5},
  {id: '5', title: 'card5', totalCards: 5},
  {id: '6', title: 'card6', totalCards: 5},
  {id: '7', title: 'card7', totalCards: 5},
  {id: '8', title: 'card8', totalCards: 5},
  {id: '9', title: 'card9', totalCards: 5},
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
    <FlatList
      data={cards}
      renderItem={({ item }) => <Item
        item={item}
        onPress={() => handleOnPress(navigation, item)}/>
      }
      keyExtractor={(item) => item.id}
    />
  );
}

export default DeckList