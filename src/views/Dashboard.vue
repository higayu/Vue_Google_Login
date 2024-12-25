<template>
  <div style="padding: 20px;">
    <h1>Welcome to Dashboard</h1>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('authToken'); // トークンを削除
  router.push('/'); // ログインページにリダイレクト
};
</script>
