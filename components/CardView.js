import React, {useState} from 'react';
import {Button, Card, Text, Colors} from 'react-native-paper';
import {StyleSheet} from 'react-native';

function CardView({question, onAnswer}) {

  const [answerView, setAnswerView] = useState(false);

  const title = answerView ? question.answer : question.question;

  const onViewAnswerClick = () => {
    setAnswerView(true);
  };

  const onViewQuestionClick = () => {
    setAnswerView(false);
  };

  return (
    <Card style={styles.content}>

      <Card.Content>
        <Text style={styles.large}>{title}</Text>
        {
          answerView ?
            <Button mode="outlined" onPress={onViewQuestionClick} style={styles.btn}>View Question</Button> :
            <Button mode="outlined" onPress={onViewAnswerClick} style={styles.btn}>View Answer</Button>
        }
      </Card.Content>
      <Card.Actions style={styles.action}>
        <Button mode="contained" icon="check" onPress={() => onAnswer(true)} style={styles.btn}>Correct</Button>
        <Button mode="contained" icon="close" color={Colors.red600} onPress={() => onAnswer(false)} style={styles.btn}>Incorrect</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  large: {
    fontSize: 32,
    marginBottom: 32
  },
  content: {
    padding: 16
  },
  btn: {
    margin: 8,
    padding: 8
  },
  action: {
    marginTop: 16,
    justifyContent: 'center'
  }
});

export default CardView;