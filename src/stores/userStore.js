import apiService from '@/services/api.js';
import { defineStore, setActivePinia } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
  }),

  getters: {
    // ログイン状態を取得するゲッター
    isLoggedIn: (state) => !!state.user,
  },


  actions: {
    // ユーザー情報を設定する
    setUser(userInfo) {
      this.user = userInfo;
    },

    // ユーザー情報をクリアする
    clearUser() {
      this.user = null;
    },
  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'user-data', storage: localStorage, paths: ['user'] },
    ],
  },
});