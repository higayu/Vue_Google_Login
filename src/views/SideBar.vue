<template>
    <aside class="w-1/4 pr-8">


    <!-- リストの表示範囲を制限してスクロール可能にする -->
    <ul class="max-h-[calc(100dvh_-_300px)] overflow-y-auto space-y-2 bg-white shadow-md rounded-md custom-scrollbar">
      <li
        v-for="(record) in filteredRecords"
        :key="`${record.day_key}-${record.user_id}`"
        class="border-b border-gray-200 last:border-b-0 flex items-center cursor-pointer"
        :class="{
          'bg-blue-100': selectItemStore.nowSelectedItem && 
                        selectItemStore.nowSelectedItem.day_key === record.day_key && 
                        selectItemStore.nowSelectedItem.user_id === record.user_id,
          'hover:bg-gray-100': hoveredItem !== record,
          'hover:bg-blue-200': hoveredItem == record && selectItemStore.nowSelectedItem == record
        }"
        @click="handleClick(record)"
        @mouseover="hoveredItem = record"
        @mouseleave="hoveredItem = null"
      >
        <transition name="sparkle-slide" mode="out-in">
          <input 
            v-show="ShareStore.print_flg"
            type="checkbox"
            v-model="record.check_val"
            class="mr-2 ml-4 cursor-pointer"
          />
        </transition>
        <button class="block p-4 flex-1 text-left">
          {{ record.day_txt }} - {{ record.user_name }}
        </button>
      </li>
    </ul>

  

    </aside>
  </template>
  
  <script>
  import { ref, reactive, computed, watch, onMounted, toRefs } from 'vue';
  import { useRouter } from 'vue-router'; // useRouterをインポート
  import { useRecodeDataStore } from '../stores/RecodeList';
  import { useUserStore } from '../stores/userStore';

  export default {
    name: "SideBar",
  
    components: {

        },
  
    setup(props, { emit }) {
      const envmoji = import.meta.env.VITE_API_URL;
      const RecodeListStore = useRecodeDataStore();
      const filteredRecords = ref([]); // デフォルト値として空配列を設定
      const userStore = useUserStore(); // ストアを使用

    // フィルタリングロジック: Search_txt と Search_id に基づいてフィルタリング
    const updateFilteredRecords = () => {
      if (!RecodeListStore.records || !Array.isArray(RecodeListStore.records)) {
        filteredRecords.value = [];
        return;
      }

      filteredRecords.value = RecodeListStore.records;
    };

    

      return {
        envmoji,
        filteredRecords,
        RecodeListStore,
        updateFilteredRecords,
      };
    },
  };
  </script>
  <style>
  /* カスタムスクロールバー */

  </style>