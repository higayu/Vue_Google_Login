<template>
  <div>
    <!-- Header Section -->
    <header>
      <div class="header-wrapper">
        <!-- Google Login Component -->
        <Googale_Login />
        
        <!-- Navigation Links -->
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/dashboard">Dashboard</RouterLink>
        </nav>
      </div>
    </header>

    <SideBar />

    <!-- Main Content -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Googale_Login from './views/Googale_Login.vue';
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
  background-color: greenyellow;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Navigation Links */
nav {
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
}

nav a.router-link-exact-active {
  background-color: #d1ffd1;
}

nav a:hover {
  background-color: #baffba;
  color: #000;
}

/* Main Content Styling */
main {
  padding: 1rem;
}

/* Responsive Design */
@media (min-width: 768px) {
  header {
    padding: 1rem 2rem;
  }

  nav a {
    padding: 0.5rem 1.5rem;
  }
}
</style>
