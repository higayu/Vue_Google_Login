import apiService from '@/services/api.js';
import { defineStore, setActivePinia } from 'pinia';

export const useRecodeDataStore = defineStore('RecodeList', {
  state: () => ({
    records: [], 
    SelectItem:null,
  }),

//-------------------------「 action 」---------------------------------//
actions: { 

 //-------　[印刷データを作成し直す関数]-----------------------------------------------//
 async getRecode() {
    const response = await apiService.getRecode();
    this.records = response.data;
  },
  async getDataList(Gmail){
    const response = await apiService.getDataList(Gmail);
    this.records =response.data;
  }

},//------------------action----------------//

  persist: {
    enabled: true,
    strategies: [
      { key: 'Data-records', storage: localStorage, paths: ['records'] },
    ]
  }
});
