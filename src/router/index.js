import { createRouter, createWebHistory } from 'vue-router';
import Googale_Login from '../views/Googale_Login.vue';
import Dashboard from '../views/Dashboard.vue';
import { useUserStore } from '../stores/userStore';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Googale_Login,
  },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true }, // 認証が必要なルート
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// グローバルナビゲーションガード
router.beforeEach((to, from, next) => {
  const userStore = useUserStore(); // Piniaストアを取得
  const isAuthenticated = userStore.isLoggedIn; // ストアから認証状態を取得

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // 未認証ならログインページへ
  } else {
    next(); // 認証済みまたは認証不要ならそのまま進む
  }
});

export default router;
