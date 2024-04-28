import { reactive, computed, toRefs } from 'vue';
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
  recomputeTrigger: boolean = false;  // Add a trigger for recomputation

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
    this.recomputeTrigger = !this.recomputeTrigger;  // Toggle to force reactivity
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
}

// In your composition function
export function useGame() {
  const gameInstance = reactive(new Game());
  const validWords = computed(() => {
    // Access the recomputeTrigger to establish a reactive dependency
    gameInstance.recomputeTrigger;  
    return gameInstance.validWords();
  });

  const refs = toRefs(gameInstance);

  return {
    ...refs,
    validWords,
    addGuess: gameInstance.addGuess.bind(gameInstance),
    startNewGame: gameInstance.startNewGame.bind(gameInstance),
    submitGuess: gameInstance.submitGuess.bind(gameInstance),
    updateGuessedLetters: gameInstance.updateGuessedLetters.bind(gameInstance),
  };
}
