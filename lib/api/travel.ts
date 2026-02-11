import axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Axios를 사용하여 async/await로 상품정보를 비동기적으로 가져오는 함수
export const getTravelApi = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/travels`);
      console.log("로드 완료 ", res);
      return res.data; //다른페이지에서 사용지 reture으로 넘겨줘야함
    } catch (error) {
      console.error("Fetching error:", error);
    }
};


