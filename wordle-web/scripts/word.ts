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
    const secretWord = new Word({ word: secretWordString });
    let isMatch = true;

    // Check for correct letters
    this.letters.forEach((letter, i) => {
      if (letter.char === secretWord.letters[i].char) {
        letter.state = LetterState.Correct;
      } else {
        isMatch = false;
        letter.state = LetterState.Wrong; // Preset to wrong before checking for misplaced
      }
    });

    // Check for misplaced letters
    this.letters.forEach((guessedLetter) => {
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
  // Create a Set to store all letters marked as 'Wrong' across all guesses
  const wrongLetters = new Set();
  this.guesses.forEach(guess => {
    guess.letters.forEach(letter => {
      if (letter.state === LetterState.Wrong) {
        wrongLetters.add(letter.char.toUpperCase());
      }
    });
  });

  // Check the other word to ensure it does not contain any of the 'Wrong' letters
  for (let char of otherWordString.toUpperCase()) {
    if (wrongLetters.has(char)) {
      return false; // If any wrong letter is found in the word, it's not valid
    }
  }

  return true; // If no wrong letters are found, the word is valid
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
