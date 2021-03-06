import React, {useEffect, useState} from 'react';
import CardView from './CardView';
import {Button, Card, Colors, ProgressBar, Surface, Text, Title} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {getDeck} from '../utils/api';

function QuizView({route, navigation}) {

  const {deckTitle} = route.params;

  const [deck, setDeck] = useState(null);

  const [questionId, setQuestionId] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  const onAnswer = (answer) => {
    answer && setCorrectAnswers(correctAnswers + 1);
    questionId === deck.questions.length - 1 ? setShowResult(true) : setQuestionId(questionId + 1)
  };

  useEffect(() => {
    let componentMounted = true;
    (async () => {
      const result = await getDeck(deckTitle);
      componentMounted && setDeck(result);
    })();

    return () => componentMounted = false;
  }, [deck]);

  return (
    !deck ? <ProgressBar indeterminate="true"/> : (
      !deck.questions.length ?
        <Card style={styles.content}>
          <Card.Content>
            <Title>No question in the deck, can not start quiz.</Title>
          </Card.Content>
        </Card> : (
          showResult ?
            <Card style={styles.content}>
              <Card.Content>
                <Title>{((correctAnswers / deck.questions.length) * 100).toFixed(2)}%</Title>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" icon="restart" style={styles.btn} onPress={() => {
                  setShowResult(false);
                  setCorrectAnswers(0);
                  setQuestionId(0);
                }}>Restart Quiz</Button>
                <Button mode="contained" icon="undo" color={Colors.green600} onPress={() => navigation.goBack()}
                        style={styles.btn}>Back to Deck</Button>
              </Card.Actions>
            </Card> :
            <Surface>
              <ProgressBar progress={(questionId / deck.questions.length)}/>
              <Text style={styles.txt}>{questionId + 1} / {deck.questions.length}</Text>
              <CardView question={deck.questions[questionId]} onAnswer={onAnswer}/>
            </Surface>
        ))
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    alignItems: 'center'
  },
  txt: {
    padding: 8
  },
  btn: {
    margin: 8,
    padding: 8
  },
});

export default QuizView;