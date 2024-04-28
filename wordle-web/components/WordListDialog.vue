<template>
  <div class="word-list-dialog">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Known Incantations ({{ validWordCount }})</v-card-title>
        <v-virtual-scroll :height="300" :items="filteredWords" item-height="48">
          <template v-slot="{ item }">
            <v-list-item class="word-item" @click="selectWord(item)">
              {{ item }}
            </v-list-item>
          </template>
        </v-virtual-scroll>
      </v-card>
    </v-dialog>
    <v-btn @click="dialog = true">Spellbook</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGame } from '../scripts/game';
import { LetterState } from '../scripts/letter';

const { validWords, addGuess, currentGuess } = useGame();
const dialog = ref(false);
const emit = defineEmits(['word-selected']);

// Compute letters ruled out based on the state
const lettersRuledOut = computed(() => {
  return currentGuess.value?.letters?.reduce((ruledOut, letter) => {
    if (letter.state === LetterState.Wrong) {
      ruledOut.push(letter.char);
    }
    return ruledOut;
  }, []) || [];
});

function isWordCompatible(word) {
  // If there's no valid guess or the game just started, assume all words are initially valid
  if (!currentGuess.value || !currentGuess.value.letters || currentGuess.value.letters.every(letter => !letter.char || letter.state === LetterState.Unknown)) {
    return true;
  }

  // Verify that the word does not contain any letters that have been ruled out
  if (word.split('').some(letter => lettersRuledOut.value.includes(letter))) {
    return false;
  }

  // Ensure the word matches the known correct positions
  for (let i = 0; i < currentGuess.value.letters.length; i++) {
    const guess = currentGuess.value.letters[i];
    if (guess.char && guess.state === LetterState.Correct && guess.char !== word[i]) {
      return false;
    }
  }

  return true;
}

const filteredWords = computed(() => {
  console.log('Computing filtered words...');
  if (!validWords.value) {
    console.error('validWords.value is undefined or null.');
    return []; // Return an empty array if validWords is not defined
  }

  // Debug output for currentGuess and lettersRuledOut
  console.log('Current Guess:', currentGuess.value?.letters?.map(l => `${l.char} (${l.state})`).join(', '));
  console.log('Letters Ruled Out:', lettersRuledOut.value);

  // Determine if there's a valid guess made
  const hasValidGuess = currentGuess.value && currentGuess.value.letters && !currentGuess.value.letters.every(letter => !letter.char || letter.state === LetterState.Unknown);

  console.log(`Has valid guess: ${hasValidGuess}`);

  if (!hasValidGuess) {
    console.log('No valid guess, returning all valid words.');
    return validWords.value; // Return all words if no valid guess has been made
  }

  const compatibleWords = validWords.value.filter(word => {
    const isCompatible = word.length === currentGuess.value.letters.length && isWordCompatible(word);
    if (!isCompatible) {
      console.log(`Word '${word}' is not compatible with the current guess.`);
    }
    return isCompatible;
  });

  console.log(`Filtered words count: ${compatibleWords.length}`);
  return compatibleWords;
});

const validWordCount = computed(() => filteredWords.value.length);

function selectWord(word) {
  console.log('Word selected:', word);
  addGuess(word);
  emit('word-selected', word);
  dialog.value = false;
}
</script>


<style scoped>
.word-list-dialog {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.word-item {
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
}

.word-item:hover {
  background-color: #e0e0e0;
}
</style>
