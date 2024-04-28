import { computed, reactive, toRefs } from 'vue';
import { LetterState, Letter } from './letter';
import { WordList } from './wordList';
import { Word } from './word';

export enum GameState {
  Playing,
  Won,
  Lost,
}

export class Game {
  maxAttempts: number = 6;
  guesses: Word[] = [];
  secretWord: string = '';
  guessIndex: number = 0;
  gameState: GameState = GameState.Playing;
  guessedLetters: Letter[] = [];

  constructor(maxAttempts: number = 6) {
    this.maxAttempts = maxAttempts;
    this.startNewGame();
  }

  startNewGame() {
    this.guessIndex = 0;
    this.gameState = GameState.Playing;
    this.guessedLetters = [];
    this.secretWord = WordList[Math.floor(Math.random() * WordList.length)].toUpperCase();
    this.guesses = Array.from({ length: this.maxAttempts }, () => new Word({ maxNumberOfLetters: this.secretWord.length }));
    console.log("Secret word: ", this.secretWord);
  }

  get currentGuess(): Word {
    return this.guesses[this.guessIndex];
  }

  public removeLastLetter(): void {
    if (this.gameState === GameState.Playing) {
      this.currentGuess.removeLastLetter();
    }
  }

  public addLetter(letter: string): void {
    if (this.gameState === GameState.Playing && letter.length === 1) {
      this.currentGuess.addLetter(letter);
      let existingLetterIndex = this.guessedLetters.findIndex(l => l.char.toUpperCase() === letter.toUpperCase());
      if (existingLetterIndex !== -1) {
        this.guessedLetters[existingLetterIndex].state = LetterState.Unknown;
      } else {
        this.guessedLetters.push(new Letter(letter, LetterState.Unknown));
      }
      this.guessedLetters = [...this.guessedLetters]; // Ensure reactive update
    }
  }

  public submitGuess(): void {
    if (this.gameState !== GameState.Playing || !this.currentGuess.isFilled || !this.currentGuess.isValidWord()) {
      return;
    }

    const isCorrect = this.currentGuess.compare(this.secretWord);
    this.updateGuessedLetters();

    if (isCorrect) {
      this.gameState = GameState.Won;
    } else if (this.guessIndex >= this.maxAttempts - 1) {
      this.gameState = GameState.Lost;
    } else {
      this.guessIndex++;
    }
  }

  public validWords(): string[] {
    // Filter out words that do not meet the criteria based on guessed letters
    return WordList.filter((word) => {
      // Convert the word to lower case for comparison
      word = word.toLowerCase();

      // First, exclude any words that contain letters that have been guessed wrong
      if (this.guessedLetters.some(letter => 
        letter.state === LetterState.Wrong && word.includes(letter.char.toLowerCase()))) {
        return false;
      }
  
      // Next, check if the word matches the correct and misplaced letters from the guesses
      return this.guesses.every((guess, guessIndex) => {
        // Assume the word is valid until proven otherwise
        let isWordValid = true;

        // Go through each letter in the guess
        guess.letters.forEach((guessedLetter, letterIndex) => {
          const lowerCaseGuessedLetter = guessedLetter.char.toLowerCase();
          // Check 'Correct' state letters are in the exact position
          if (guessedLetter.state === LetterState.Correct) {
            if (word[letterIndex] !== lowerCaseGuessedLetter) {
              isWordValid = false;
            }
          }
          // Check 'Misplaced' state letters are in the word but not in the current position
          else if (guessedLetter.state === LetterState.Misplaced) {
            if (!word.includes(lowerCaseGuessedLetter) || word[letterIndex] === lowerCaseGuessedLetter) {
              isWordValid = false;
            }
          }
        });
  
        // The word is only valid if it passed all the checks
        return isWordValid;
      });
    });
  }


  public addGuess(word: string): void {
    if (this.gameState !== GameState.Playing) return;
    this.currentGuess.fill(word.toUpperCase());
    this.submitGuess();
    this.guesses = [...this.guesses]; // Ensure reactivity
  }

  public updateGuessedLetters(): void {
    this.currentGuess.letters.forEach((letter) => {
      const existingLetterIndex = this.guessedLetters.findIndex(l => l.char === letter.char);
      if (existingLetterIndex !== -1) {
        if (letter.state > this.guessedLetters[existingLetterIndex].state) {
          this.guessedLetters[existingLetterIndex] = new Letter(letter.char, letter.state);
        }
      } else {
        this.guessedLetters.push(new Letter(letter.char, letter.state));
      }
    });
    this.guessedLetters = [...this.guessedLetters]; // Force reactivity
  }
}

const gameInstance = reactive(new Game());

export function useGame() {
  const refs = toRefs(gameInstance);
  const validWords = computed(() => gameInstance.validWords());

  return {
    ...refs,
    validWords,
    addGuess: gameInstance.addGuess.bind(gameInstance),
    startNewGame: gameInstance.startNewGame.bind(gameInstance),
    submitGuess: gameInstance.submitGuess.bind(gameInstance),
    updateGuessedLetters: gameInstance.updateGuessedLetters.bind(gameInstance),
  };
}
