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
  console.group('DECKS');
  console.log(decks);
  console.groupEnd();
  if (decks) {
    return;
  }

  await AsyncStorage.setItem(storageKey, JSON.stringify(initialData));
})();

export async function getDecks() {
  const decks = await AsyncStorage.getItem(storageKey);
  if (!decks) {
    return {};
  }

  return JSON.parse(decks);
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

  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(decks));
    return Promise.resolve(`deck ${title} added.`)
  } catch (e) {
    return Promise.reject(e)
  }
}