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
    console.log(this.secretWord);
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

  this.currentGuess.fill(word.toUpperCase());
  this.guesses = [...this.guesses];
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

const gameInstance = reactive(new Game());

const validWords = computed(() => {
  return WordList.filter(word => gameInstance.guesses.every(guess => guess.isCompatibleWith(word)));
});

export function useGame() {
  // toRefs will convert each property on the reactive gameInstance into a ref
  const refs = toRefs(gameInstance);
  
  // Now, include the computed property for validWords in the object returned by useGame.
  return {
    ...refs,
    validWords,
    addGuess: gameInstance.addGuess.bind(gameInstance),
    startNewGame: gameInstance.startNewGame.bind(gameInstance),
    submitGuess: gameInstance.submitGuess.bind(gameInstance),
    updateGuessedLetters: gameInstance.updateGuessedLetters.bind(gameInstance),
  };
}
