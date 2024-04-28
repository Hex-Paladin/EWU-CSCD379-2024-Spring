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
  public maxAttempts: number;
  public guesses: Word[];
  public secretWord: string;
  public guessIndex: number;
  public gameState: GameState;
  public guessedLetters: Letter[];

  constructor(maxAttempts: number = 6) {
    this.maxAttempts = maxAttempts;
    this.secretWord = '';
    this.guessIndex = 0;
    this.gameState = GameState.Playing;
    this.guessedLetters = [];
    this.guesses = [];
    this.startNewGame();
  }

  public startNewGame() {
    this.guessIndex = 0;
    this.gameState = GameState.Playing;
    this.guessedLetters = [];

    // Get a random word from the word list
    this.secretWord = WordList[Math.floor(Math.random() * WordList.length)].toUpperCase();
    console.log(this.secretWord);

    // Populate guesses with the correct number of empty words
    this.guesses = Array.from({ length: this.maxAttempts }, () => new Word({ maxNumberOfLetters: this.secretWord.length }));
  }

  public get currentGuess(): Word {
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

  // Define a method that will be converted into a computed property in the reactive context
  public calculateValidWords(): string[] {
    return WordList.filter(word => this.guesses.every(guess => guess.isCompatibleWith(word)));
  }

  public addGuess(word: string): void {
    if (this.gameState !== GameState.Playing) return;

    this.currentGuess.clear();

    for (let char of word.toUpperCase()) {
      this.addLetter(char);
    }
  }

  public updateGuessedLetters(): void {
    this.currentGuess.letters.forEach((letter) => {
      const existingLetter = this.guessedLetters.find(existing => existing.char === letter.char);
      if (existingLetter) {
        if (letter.state > existingLetter.state) {
          existingLetter.state = letter.state;
        }
      } else {
        this.guessedLetters.push(letter);
      }
    });
  }
}

// Create a reactive instance of Game to be used across the application
const gameInstance = reactive(new Game());

// Create a computed ref for validWords inside the reactive context
gameInstance.validWords = computed(() => gameInstance.calculateValidWords());

export function useGame() {
  // Create a shallow reactive copy of gameInstance
  const gameRefs = toRefs(gameInstance);

  return {
    ...gameRefs,
    // Now we include the computed property as part of the return value
    validWords: gameInstance.validWords,
    addGuess: gameInstance.addGuess.bind(gameInstance),
    startNewGame: gameInstance.startNewGame.bind(gameInstance),
    submitGuess: gameInstance.submitGuess.bind(gameInstance),
    updateGuessedLetters: gameInstance.updateGuessedLetters.bind(gameInstance),
  };
}
