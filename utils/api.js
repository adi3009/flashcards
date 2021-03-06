import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = '@flashcardsDecks';

const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

(async () => {
  //await AsyncStorage.clear();
  const decks = await AsyncStorage.getItem(storageKey);
  if (decks) {
    return;
  }

  await save(initialData);
})();

async function save(decks) {
  return AsyncStorage.setItem(storageKey, JSON.stringify(decks));
}

export async function getDecks() {
  const decks = await AsyncStorage.getItem(storageKey);
  if (!decks) {
    return {};
  }

  return JSON.parse(decks);
}

export async function getDeck(deckTitle) {
  const decks = await getDecks();

  return decks[deckTitle];
}

export async function addDeck(title) {
  const decks = await getDecks();
  if (decks[title]) {
    return Promise.reject(`deck ${title} already exists.`);
  }

  decks[title] = {
    title: title,
    questions: []
  };

  return save(decks);
}

export async function addCardToDeck(deckTitle, question, answer) {
  const decks = await getDecks();
  const deck = decks[deckTitle];
  if (!deck) {
    return Promise.reject(`deck ${deckTitle} does not exist.`);
  }

  deck.questions.push({question: question, answer: answer});

  return save(decks);
}