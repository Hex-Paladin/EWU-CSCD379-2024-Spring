import { Letter, LetterState } from "./letter";
import { WordList } from "./wordList";

interface WordOptions {
  maxNumberOfLetters?: number;
  word?: string;
}

export class Word {
  public letters: Letter[];

  constructor(wordOptions: WordOptions) {
    if (wordOptions.word) {
      this.letters = wordOptions.word.split("").map((char) => new Letter(char));
    } else if (wordOptions.maxNumberOfLetters) {
      this.letters = Array.from(
        { length: wordOptions.maxNumberOfLetters },
        () => new Letter("")
      );
    } else {
      throw new Error(
        "WordOptions must have either maxNumberOfLetters or word"
      );
    }
  }

  public addLetter(newLetter: string): void {
    const emptyLetter = this.letters.find((letter) => !letter.char);
    if (emptyLetter) {
      emptyLetter.char = newLetter;
    }
  }

  public removeLastLetter(): void {
    for (let i = this.letters.length - 1; i >= 0; i--) {
      if (this.letters[i].char) {
        this.letters[i].char = "";
        break;
      }
    }
  }

  public get isFilled(): boolean {
    return this.letters.every((letter) => letter.char);
  }

  public compare(secretWordString: string): boolean {
    secretWordString = secretWordString.toLowerCase();
    let isCorrect = true;

    this.letters.forEach((letter, index) => {
      if (letter.char.toLowerCase() === secretWordString[index]) {
        letter.state = LetterState.Correct;
      } else if (secretWordString.includes(letter.char.toLowerCase())) {
          letter.state = LetterState.Misplaced;
        isCorrect = false;
      } else {
        letter.state = LetterState.Wrong;
        isCorrect = false;
      }
    });

    return isCorrect;
  }

    // Check for misplaced letters
    this.letters.forEach((guessedLetter, i) => {
      if (guessedLetter.state === LetterState.Wrong) {
        const sameLetterInSecret = secretWord.letters.find(
          (toGuessLetter) => toGuessLetter.char === guessedLetter.char && toGuessLetter.state !== LetterState.Correct
        );
        if (sameLetterInSecret) {
          guessedLetter.state = LetterState.Misplaced;
        }
      }
    });

    return isMatch;
  }

  public get word(): string {
    return this.letters.map((letter) => letter.char).join("");
  }

  public isValidWord(): boolean {
    return WordList.includes(this.word.toLowerCase());
  }

  public clear(): void {
    this.letters.forEach((letter) => {
      letter.char = "";
    });
  }

  public isCompatibleWith(otherWordString: string): boolean {
    const otherWord = new Word({ word: otherWordString.toUpperCase() });

    // Create a set of 'Wrong' letters from all guesses
    const wrongLetters = new Set(
      this.letters
        .filter(letter => letter.state === LetterState.Wrong)
        .map(letter => letter.char.toUpperCase())
    );

    // If the other word contains any 'Wrong' letter, return false
    return !otherWord.letters.some(letter => wrongLetters.has(letter.char));
  }

  public fill(wordString: string): void {
    this.clear();
    wordString.split('').forEach((char, index) => {
      if (index < this.letters.length) {
        this.letters[index].char = char;
      }
    });
  }
}
