<template>
  <div>
    <!-- Header Section -->
    <Header />

    <!-- Content Section: SideBar and Main -->
    <div class="layout-wrapper">
      <SideBar />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SideBar from './views/SideBar.vue';
import Header from './views/Header.vue';
</script>

<style scoped>


/* General Styling */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  overflow: hidden; /* Prevent body from scrolling */
}

/* Header Styling */
header {
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Layout Wrapper Styling */
.layout-wrapper {

  position: relative;
  height: 100vh; /* Full height */
  margin-top: 0;
  overflow: hidden; /* Prevent layout from scrolling */
}

/* SideBar Styling */
.layout-wrapper > SideBar {
  background-color: #f4f4f4;
  width: 250px;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 70px; /* Below the header */
  left: 0;
  height: calc(100vh - 70px); /* Full height minus header */
  z-index: 999; /* Ensure it appears above main content */
}

/* Main Content Styling */
main {
  flex-grow: 1;
  margin-left: 250px; /* Adjust for sidebar width */
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 70px); /* Full height minus header */
}
</style>
