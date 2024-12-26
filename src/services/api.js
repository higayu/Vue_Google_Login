// services/api.js

import axios from 'axios';
import ExcelJS from 'exceljs';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    }

    // ユーザーリスト取得メソッド
    async getUsers() {
        try {
            const response = await this.api.get(import.meta.env.VITE_USER_LIST, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    // スタッフリスト取得メソッド
    async getStaffs() {
        try {
            const response = await this.api.get(import.meta.env.VITE_STAFF_LIST, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching staffs:', error);
            throw error;
        }
    }


    // 選択した1か月分の月のサイドバー情報を取得するメソッド
    async getDataList(Gmail) {
        try {

            const postData = { prev: '', account: Gmail };
            const response = await this.api.post(import.meta.env.VITE_API_DATALIST, postData, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                }
              });
            return response.data;
        } catch (error) {
            console.error('Error fetching sidebar info for month:', error);
            throw error;
        }
    }

    // 選択した日付と名前の印刷に必要なデータ1件を取得するようにする
    async getPrint(sendrecode) {
        console.log('受け取った値',sendrecode);
        try {
            const postData = { id: sendrecode.user_id, date: sendrecode.day_key };
            const response = await this.api.post(import.meta.env.VITE_PRINT, postData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Error fetching print data:', error);
            throw error;
        }
    }
        //-----------------------[追加保存処理]-------------------------------------------// 
        async postInputData(formData) {
            try {
                // 送信データの作成
                const dataToSend = {
                    form: formData,
                };
                console.log('送信するデータ', dataToSend);
                console.log('.envファイル読み込み確認 VITE_SAVE_DATA', import.meta.env.VITE_SAVE_DATA);
                console.log('envファイル VITE_API_HOME', import.meta.env.VITE_API_HOME);
                
                const response = await this.api.post(import.meta.env.VITE_SAVE_DATA, dataToSend);
                
                alert("データが保存されました！");
                console.log(response.data);
        
                return response; // 成功時に response オブジェクトを返す
            } catch (error) {
                console.error("保存中にエラーが発生しました", error);
                alert("保存に失敗しました");
                return error.response || error; // エラー時にも response またはエラーオブジェクトを返す
            }
        }
    //-------------------------------更新処理------------------------------------///
        async postUpdateData(formData) {
            try {
                // 送信データの作成
                const dataToSend = {
                    form: formData,
                };
                console.log('送信するデータ', dataToSend);
                console.log('.envファイル読み込み確認 VITE_API_UPDATE', import.meta.env.VITE_UPDATE);
                console.log('envファイル VITE_API_HOME', import.meta.env.VITE_API_HOME);
                
                const response = await this.api.post(import.meta.env.VITE_UPDATE, dataToSend);
                
                alert("データが更新されました！");
                console.log(response.data);
        
                return response; // 成功時に response オブジェクトを返す
            } catch (error) {
                console.error("更新中にエラーが発生しました", error);
                alert("更新に失敗しました");
                return error.response || error; // エラー時にも response またはエラーオブジェクトを返す
            }
        }

//-------------------------------------------------------------------//
// 選択した日付と名前からすでに保存しているデータが存在するか取得するメソッド
async getRecode(sendrecode) {
    console.log('受け取った値', sendrecode);
    try {
        const postData = { user_id: sendrecode.user_id, day_key: sendrecode.day_key };
        const response = await this.api.post(import.meta.env.VITE_GET_RECODE, postData, { withCredentials: true });

        console.log('レスポンス', response.data);
        // レスポンスでデータが存在するかを確認
        if (response.data) {
            return true;  // データが取得できた場合
        } else {
            return false; // データが存在しない場合
        }

    } catch (error) {
        console.error('Error fetching print data:', error);
        console.log('取得処理で例外のエラー');
        return false; // 取得に失敗した場合は false を返す
    }
}

//------------------------------------------------------------------//

    async getExcel_template(){

        const API_URL = import.meta.env.VITE_API_URL+import.meta.env.VITE_EXCEL_KANRI;

        try {
          const response = await axios.get(API_URL, {
            responseType: 'arraybuffer',
          });
    
          return response.data;
        } catch (error) {
          console.error('Error fetching the Excel file with ExcelJS:', error);
        }
    }

    //------------------------------------------------------------------------//
        // 選択した日付と名前の印刷に必要なデータ1件を取得するようにする
    async getKanri_kiroku(sendrecode) {
        console.log('受け取った値',sendrecode);
        try {
            const postData = { day_val: sendrecode };
            const response = await this.api.post(import.meta.env.VITE_KANRI_KIROKU, postData, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error('Error fetching print data:', error);
            throw error;
        }
    }    
    //---------------------------------------------------------------------------//
    //------------------------------------------------------------------------//
        // 選択した日付と名前の印刷に必要なデータ1件を取得するようにする
        async getKanri_userList(sendrecode) {
            console.log('受け取った値',sendrecode);
            try {
                const postData = { day_val: sendrecode };
                const response = await this.api.post(import.meta.env.VITE_KANRI_USERLIST, postData, { withCredentials: true });
                return response.data;
            } catch (error) {
                console.error('Error fetching print data:', error);
                throw error;
            }
        }    
        //---------------------------------------------------------------------------//


}

// インスタンスをエクスポートして、他のモジュールで再利用可能に
const apiService = new ApiService();
export default apiService;
