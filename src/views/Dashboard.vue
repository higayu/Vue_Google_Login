<template>
  <div>
    <h1>Welcome to the Dashboard</h1>
    <p>{{ user.name }} さん、こんにちは！</p>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore'; // Pinia ストアをインポート

export default {
  setup() {
    const userStore = useUserStore();
    const user = userStore.user;

    return { user };
  },
};
</script>
