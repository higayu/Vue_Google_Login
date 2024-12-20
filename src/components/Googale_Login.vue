<template>
  <div style="background-color: pink;">
    <h1>Google Login</h1>
    <button @click="handleLogin">Login with Google</button>
    <p v-if="user">Hello, {{ user.name }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gapi } from 'gapi-script';

const clientId = 'YOUR_GOOGLE_CLIENT_ID'; // Google Cloud Consoleから取得したクライアントID
const user = ref(null);

const handleLogin = () => {
  gapi.auth2.getAuthInstance().signIn().then(response => {
    const profile = response.getBasicProfile();
    user.value = {
      id: profile.getId(),
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl(),
    };
    console.log(user.value);
  });
};

onMounted(() => {
  function start() {
    gapi.client.init({
      clientId,
      scope: 'email profile',
    });
  }

  gapi.load('client:auth2', start);
});
</script>

<style scoped>
button {
  background-color: #4285F4;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #357AE8;
}
</style>
