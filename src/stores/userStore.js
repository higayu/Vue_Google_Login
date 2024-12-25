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
      localStorage.removeItem('user-data'); // persistでも消去されるが明示的に追加
    },

    // ログイン処理
    async login(credentials) {
      try {
        const response = await apiService.post('/login', credentials);
        const userInfo = response.data;
        this.setUser(userInfo); // ストアに保存
        return userInfo;
      } catch (error) {
        console.error('Login failed:', error);
        throw error; // エラーを呼び出し元に伝播
      }
    },

    // ログアウト処理
    async logout() {
      try {
        await apiService.post('/logout');
        this.clearUser();
      } catch (error) {
        console.error('Logout failed:', error);
        throw error; // エラーを呼び出し元に伝播
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      { key: 'user-data', storage: localStorage, paths: ['user'] },
    ],
  },
});