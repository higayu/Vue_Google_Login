<template>
  <div style="background-color: aqua;">
    <h1>Login</h1>
    <button @click="signInWithGoogle">Sign in with Google</button>
    <p v-if="user">Welcome, {{ user.name }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '../firebase'; // firebase.js をインポート
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const user = ref(null);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const profile = result.user;
    user.value = {
      name: profile.displayName,
      email: profile.email,
      photo: profile.photoURL,
    };
    console.log("User signed in:", user.value);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};
</script>
