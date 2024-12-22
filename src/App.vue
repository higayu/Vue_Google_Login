<template>
  <div>
    
    <!-- Header Section -->
    <header>
      <div class="header-wrapper">
        <h1>OCRアプリケーション</h1>
        <!-- Navigation Links -->
        <nav>
          <RouterLink to="/">ログアウト</RouterLink>
        </nav>
      </div>
    </header>

    <!-- Content Section: SideBar and Main -->
    <div class="content-wrapper">
      <SideBar />
      <main>
        <RouterView />
      </main>
    </div>

  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import VueLocalStorage from 'vue-local-storage';
import SideBar from './views/SideBar.vue'

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

/* Content Wrapper Styling */
.content-wrapper {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 70px); /* Full height minus header */
}

/* SideBar Styling */
SideBar {
  background-color: #f4f4f4;
  width: 250px;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Main Content Styling */
main {
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>