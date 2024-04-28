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
        // Update the letter state reactively
        this.guessedLetters[existingLetterIndex] = new Letter(letter, LetterState.Unknown);
      } else {
        this.guessedLetters.push(new Letter(letter, LetterState.Unknown));
      }
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
  this.guessedLetters = [...this.guessedLetters];
}

public validWords(): string[] {
  console.log("Recalculating valid words...");
  return WordList.filter((word) => {
    word = word.toLowerCase();

    // Check each guess
    return this.guesses.every((guess) => {
      let isWordValid = true;

      // Check each letter in the guess
      guess.letters.forEach((guessedLetter, index) => {
        const guessedChar = guessedLetter.char.toLowerCase();
        const actualChar = word[index];

        // Letter marked as 'Correct' must be in the exact position
        if (guessedLetter.state === LetterState.Correct) {
          if (actualChar !== guessedChar) {
            isWordValid = false;
          }
        } 
        // Letter marked as 'Misplaced' must be in the word, but not in the guessed position
        else if (guessedLetter.state === LetterState.Misplaced) {
          if (!word.includes(guessedChar) || actualChar === guessedChar) {
            isWordValid = false;
          }
        }
        // Letter marked as 'Wrong' should not appear anywhere in the word
        else if (guessedLetter.state === LetterState.Wrong) {
          if (word.includes(guessedChar)) {
            isWordValid = false;
          }
        }
      });

      return isWordValid;
    });
  });
}

  public addGuess(word: string): void {
    if (this.gameState !== GameState.Playing) return;

    this.currentGuess.fill(word.toUpperCase());
    this.submitGuess();
    this.guesses = [...this.guesses]; // ensure reactivity
  }

  public updateGuessedLetters(): void {
    this.currentGuess.letters.forEach((letter) => {
      const existingLetterIndex = this.guessedLetters.findIndex(l => l.char === letter.char);
      if (existingLetterIndex !== -1) {
        // Update the letter state reactively
        const existingLetter = this.guessedLetters[existingLetterIndex];
        if (letter.state > existingLetter.state) {
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
