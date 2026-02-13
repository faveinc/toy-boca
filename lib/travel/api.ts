import axios from 'axios'
import { TravelCardApi } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Axios를 사용하여 async/await로 상품정보를 비동기적으로 가져오는 함수
// GET
export const getTravelApi = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/travels`);
      console.log("로드 완료 ", res);
      return res.data; 
    } catch (error) {
      console.error("Fetching error:", error);
    }
};
// POST
export const postTravelApi = async (data: Partial<TravelCardApi>) => {
    try {
      const res = await axios.post(`${BASE_URL}api/travels`, data);
      console.log("로드 완료 ", res);
      return res.data; 
    } catch (error) {
      console.error("Fetching error:", error);
      throw error;
    }
};
// PUT - 데이터 수정
export const putTravelApi = async (id: string, data: Partial<TravelCardApi>) => {
    try {
      const res = await axios.put(`${BASE_URL}api/travels/${id}`, data);
      console.log("로드 완료 ", res);
      return res.data; 
    } catch (error) {
      console.error("Fetching error:", error);
      throw error;
    }
};
// DELETE
export const deleteTravelApi = async (id: string) => {
try {
    const res = await axios.delete(`${BASE_URL}api/travels/${id}`);
    console.log("로드 완료 ", res);
    return res.data; 
} catch (error) {
    console.error("Fetching error:", error);
    throw error;
}
};

