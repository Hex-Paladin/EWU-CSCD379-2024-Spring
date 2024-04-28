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
import { ref, computed, watch } from 'vue';
import { useGame } from '../scripts/game';
import { LetterState } from '../scripts/letter';

const { validWords, currentGuess } = useGame();
const dialog = ref(false);

// Compute letters ruled out based on the state
const lettersRuledOut = computed(() => {
  if (!currentGuess.value || !Array.isArray(currentGuess.value)) {
    return [];
  }
  return currentGuess.value.reduce((ruledOut, letter) => {
    if (letter && letter.state === LetterState.Wrong) {
      ruledOut.push(letter.char);
    }
    return ruledOut;
  }, []);
});

function isWordCompatible(word) {
  if (!currentGuess.value || !Array.isArray(currentGuess.value) || currentGuess.value.length === 0) {
    return true; // If there's no guess or it's not properly formed, assume all words are initially valid
  }

  // Verify that the word does not contain any letters that have been ruled out
  if (word.split('').some(letter => lettersRuledOut.value.includes(letter))) {
    return false;
  }

  // Ensure the word matches the known correct positions
  for (let i = 0; i < currentGuess.value.length; i++) {
    const guess = currentGuess.value[i];
    if (guess && guess.state === LetterState.Correct && guess.char !== word[i]) {
      return false;
    }
  }

  return true;
}

const filteredWords = computed(() => {
  if (!validWords.value || !Array.isArray(validWords.value) || !currentGuess.value || !Array.isArray(currentGuess.value)) {
    return []; // Return an empty array if necessary data is not available or not properly formed
  }

  if (currentGuess.value.every(letter => letter === null || letter.state === LetterState.Unknown)) {
    return validWords.value; // Return all words if no valid guess has been made
  }

  return validWords.value.filter(word =>
    word.length === currentGuess.value.length &&
    isWordCompatible(word)
  );
});

const validWordCount = computed(() => filteredWords.value.length);

function selectWord(word) {
  console.log('Word selected:', word);
  addGuess(word);
  emit('word-selected', word);
  dialog.value = false;
}

watch([currentGuess, validWords], () => {
  // Reactively update filtered words when changes occur
}, { deep: true });
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
