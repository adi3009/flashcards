import React, {useState} from 'react';
import CardView from './CardView';
import {Card, ProgressBar, Surface, Text, Title} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const deck = {
  title: 'React',
  questions: [
    {
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    },
    {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event'
    },
    {
      question: 'React is awesome',
      answer: 'yes'
    }
  ]
};

function QuizView() {

  const [questionId, setQuestionId] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  const onAnswer = (answer) => {
    answer && setCorrectAnswers(correctAnswers + 1);
    questionId === deck.questions.length - 1 ? setShowResult(true) : setQuestionId(questionId + 1)
  };

  return (
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
          </Card> :
          <Surface>
            <ProgressBar progress={(questionId / deck.questions.length)}/>
            <Text style={styles.txt}>{questionId + 1} / {deck.questions.length}</Text>
            <CardView question={deck.questions[questionId]} onAnswer={onAnswer} />
          </Surface>
      )
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    alignItems: 'center'
  },
  txt: {
    padding: 8
  }
});

export default QuizView;