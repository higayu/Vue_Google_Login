<template>
  <div>
    <!-- Header Section -->
    <header>
      <div class="header-wrapper">
        <h1>OCRアプリケーション</h1>
        <Googale_Login />
      </div>
    </header>
  </div>
</template>

<script>
import { ref, reactive, computed, watch, onMounted, toRefs } from 'vue';
import { RouterView } from 'vue-router'; // RouterLink削除
import Googale_Login from './Googale_Login.vue';

export default {
  name: "Header",

  components: {
    Googale_Login,
  },

  setup(props, { emit }) {
    const envmoji = import.meta.env.VITE_API_URL;

    return {
      envmoji,
    };
  },
};
</script>

<style scoped>
/* General Styling */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Header Styling */
header {
  background-color: #4caf50;
  color: white;
  padding: 1rem;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Main Content Styling */
main {
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 70px); /* Full height minus header */
}
</style>
