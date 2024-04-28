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
      let existingLetter = this.guessedLetters.find(l => l.char === letter);
      if (existingLetter) {
        existingLetter.state = LetterState.Unknown; // Assuming you handle the state elsewhere
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
  }

  public validWords(): string[] {
    return WordList.filter((word) => {
      for (let guessedLetter of this.guessedLetters) {
        const char = guessedLetter.char.toLowerCase();
        const isInWord = word.toLowerCase().includes(char);
        if ((isInWord && guessedLetter.state === LetterState.Wrong) ||
            (!isInWord && (guessedLetter.state === LetterState.Correct || guessedLetter.state === LetterState.Misplaced))) {
          return false;
        }
      }
      return true;
    });
  }

  public addGuess(word: string): void {
    if (this.gameState !== GameState.Playing) return;

    this.currentGuess.fill(word.toUpperCase());
    this.guesses = [...this.guesses]; // ensure reactivity
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
