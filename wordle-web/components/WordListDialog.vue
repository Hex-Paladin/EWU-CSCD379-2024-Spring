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
import { ref, watch, computed } from 'vue';
import { useGame } from '../scripts/game';

const emit = defineEmits(['word-selected']);
const dialog = ref(false);

const { validWords, addGuess, currentGuess } = useGame();

function isWordCompatible(word) {
  if (!currentGuess.value || !currentGuess.value.letters) {
    return false; // Guard clause if currentGuess or its letters are undefined
  }

  for (let i = 0; i < currentGuess.value.letters.length; i++) {
    if (currentGuess.value.letters[i] !== null && currentGuess.value.letters[i] !== word[i]) {
      return false; // Letter at position i does not match the guess
    }
  }

  if (word.split('').some(letter => lettersRuledOut && lettersRuledOut.includes(letter))) {
    return false; // Word contains a letter that has been ruled out
  }

  return true; // The word is compatible with the current guess and ruled out letters
}

const filteredWords = computed(() => {
  if (!validWords.value || !currentGuess.value) {
    return []; // Return an empty array if validWords or currentGuess is not defined
  }
  
  return validWords.value.filter(word => 
    word.length === currentGuess.value.letters.length && 
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
  // Update filtered words whenever the current guess or valid words change
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
