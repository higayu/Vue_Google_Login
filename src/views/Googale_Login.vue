<template>
  <div style="background-color: pink; padding: 20px; text-align: center;">
    <h1>Google Login</h1>
    <button v-if="!user" @click="handleLogin">Login with Google</button>
    <p v-if="user">
      Hello, <strong>{{ user.name }}</strong><br />
      <img :src="user.image" alt="Profile Picture" style="border-radius: 50%; width: 100px; height: 100px;" /><br />
      Email: {{ user.email }}
    </p>
    <button v-if="user" @click="handleLogout" style="margin-top: 20px;">Logout</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gapi } from 'gapi-script';

const clientId = '329141313781-09ervh52c9jb3egdogkfcsdqv506qkq3.apps.googleusercontent.com'; // Google Cloud Consoleから取得したクライアントID
const user = ref(null);

const handleLogin = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  authInstance.signIn()
    .then(response => {
      const profile = response.getBasicProfile();
      user.value = {
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        image: profile.getImageUrl(),
      };
      console.log('User logged in:', user.value);
    })
    .catch(error => {
      console.error('Login failed:', error);
    });
};

const handleLogout = () => {
  const authInstance = gapi.auth2.getAuthInstance();
  authInstance.signOut().then(() => {
    user.value = null;
    console.log('User logged out');
  });
};

onMounted(() => {
  const start = () => {
    gapi.client.init({
      clientId,
      scope: 'email profile',
    }).then(() => {
      console.log('Google API initialized');
    }).catch(error => {
      console.error('Failed to initialize Google API:', error);
    });
  };

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
  font-size: 16px;
}

button:hover {
  background-color: #357AE8;
}

button:active {
  background-color: #2A65C0;
}

p {
  font-size: 18px;
  margin-top: 20px;
}

strong {
  color: #333;
}
</style>
