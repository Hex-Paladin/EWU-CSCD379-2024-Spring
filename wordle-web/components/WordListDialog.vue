<template>
  <div class="word-list-dialog">
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Known Incantations ({{ validWordCount }})</v-card-title>
          <v-virtual-scroll
            :height="300"
            :items="filteredValidWords"
            item-height="48"
            >
        <template v-slot="{ item }">
        <v-list-item
          class="word-item"
          @click="selectWord(item)"
        >
      {{ item }}
    </v-list-item>
  </template>
</v-virtual-scroll>

        </v-card-text>
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

// Create a reactive reference for the filtered valid words
const filteredValidWords = computed(() => {
  return validWords.value.filter(word => 
    word.length === currentGuess.value.letters.length && 
    isWordCompatible(word)
  );
});

// Compute the count of valid words
const validWordCount = computed(() => filteredValidWords.value.length);

// Example function to check if a word is compatible with the current guess
function isWordCompatible(word) {
  // Implement your logic to check if a word can still be used based on game rules
  // For example, if no letter of the word has been guessed or ruled out
  return true; // Placeholder
}

function selectWord(word) {
  console.log('Word selected:', word); // Log the selected word
  addGuess(word); // Assuming addGuess updates the game state
  emit('word-selected', word);
  dialog.value = false; // Close the dialog
  // Optionally, remove the word from the list (already handled by reactivity)
}

// React to changes in the game's current guess or valid words list
watch([currentGuess, validWords], () => {
  // This will trigger reactivity whenever the current guess or valid words list changes
}, { deep: true });

</script>


<style scoped>
.word-list-dialog {
  display: flex;
  justify-content: flex-end; /* Align to the right */
  margin-bottom: 10px; /* Adjust spacing as needed */
}

.word-item {
  cursor: pointer;
  padding: 10px;
  margin: 5px 0;
}

.word-item:hover {
  background-color: #e0e0e0; /* Highlight item on hover */
}
</style>
