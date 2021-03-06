import React, {useState} from 'react';
import {Button, Snackbar, Surface, TextInput, Title} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {addCardToDeck} from '../utils/api';

function NewCard({route, navigation}) {
  const {deckTitle} = route.params;

  const [question, setQuestion] = useState('');

  const [answer, setAnswer] = useState('');

  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!question.trim().length || !answer.trim().length) {
      setMessage('question and answer can not be empty');

      return;
    }

    setLoading(true);
    try {
      await addCardToDeck(deckTitle, question.trim(), answer.trim());
      navigation.goBack();
    } catch (e) {
      setMessage(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Surface style={styles.surface}>
        <TextInput label="Question" style={styles.input} value={question} onChangeText={(text) => setQuestion(text)}/>
        <TextInput label="Answer" style={styles.input} value={answer} onChangeText={(text) => setAnswer(text)}/>
        <Button
          mode="contained"
          style={styles.btn}
          loading={loading}
          onPress={onSubmit}
        >
          Submit
        </Button>
      </Surface>
      <Snackbar visible={message.length}
                onDismiss={() => setMessage('')}
                duration={2000}
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
  input: {
    marginBottom: 16
  },
  snackbar: {
    position: 'absolute',
    bottom: 30,
  }
});

export default NewCard;