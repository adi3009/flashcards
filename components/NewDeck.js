import React, {useState} from 'react';
import {Button, Snackbar, Surface, TextInput, Title} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {addDeck} from '../utils/api';

function NewDeck({navigation}) {

  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  const onChange = (text) => setTitle(text);

  const onSubmit = async () => {
    if (title.trim().length < 3) {
      setMessage('title must be at least 3 characters.');

      return;
    }

    setLoading(true);
    try {
      await addDeck(title.trim());
      navigation.navigate('DeckView', {title});
    } catch (e) {
      setLoading(false);
      setMessage(e);
    }
  };

  return (
    <>
      <Surface style={styles.surface}>
        <Title style={styles.title}>What is the title of your new deck?</Title>
        <TextInput label="Deck Title" value={title} onChangeText={onChange}/>
        <Button mode="contained" style={styles.btn} loading={loading} onPress={onSubmit}>Submit</Button>
      </Surface>
      <Snackbar visible={message.length}
                onDismiss={() => setMessage('')}
                duration="2000"
                style={styles.snackbar}>
        {message}
      </Snackbar>
    </>
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
  },
  snackbar: {
    position: 'absolute',
    bottom: 30,
  }
});

export default NewDeck;