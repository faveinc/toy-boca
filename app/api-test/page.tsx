"use client";
import * as React from "react";
import { useState, useEffect } from 'react';
import { getTravelApi, postTravelApi, putTravelApi, deleteTravelApi } from '@/lib/travel/api';
import { TravelCardApi } from '@/lib/travel/types';

export default function ApiTestPage() {
  const [travelList, setTravelList] = useState<TravelCardApi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // 수정 중인 항목 ID
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // POST 폼 상태
  const [formData, setFormData] = useState<Partial<TravelCardApi>>({
    region: 'ASIA',
    country: '',
    destination_name: '',
    date_start: '',
    date_end: '',
    memo: '',
    description: '',
    is_confirmed: false,
    image_url: '',
  });
  
  // 수정 폼 상태
  const [editFormData, setEditFormData] = useState<Partial<TravelCardApi>>({});

  // 페이지 로드 시 자동으로 리스트 불러오기
  useEffect(() => {
    handleGetList();
  }, []);

  // GET - 리스트 조회
  const handleGetList = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await getTravelApi();
      if (res && res.data) {
        setTravelList(res.data);
      } else if (Array.isArray(res)) {
        // API가 직접 배열을 반환하는 경우
        setTravelList(res);
      } else {
        setError('데이터를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(`에러: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // POST - 데이터 추가
  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await postTravelApi(formData);
      setSuccess('여행지가 성공적으로 추가되었습니다!');
      // 폼 초기화
      setFormData({
        region: 'ASIA',
        country: '',
        destination_name: '',
        date_start: '',
        date_end: '',
        memo: '',
        description: '',
        is_confirmed: false,
        image_url: '',
      });
      // 리스트 새로고침
      await handleGetList();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '데이터 추가에 실패했습니다.';
      setError(`에러: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // 수정 모드 시작
  const handleStartEdit = (travel: TravelCardApi) => {
    if (!travel.id) {
      setError('ID가 없는 항목은 수정할 수 없습니다.');
      return;
    }
    setEditingId(travel.id);
    setEditFormData({ ...travel });
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  // PUT - 데이터 수정
  const handleUpdate = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await putTravelApi(id, editFormData);
      setSuccess('여행지가 성공적으로 수정되었습니다!');
      setEditingId(null);
      setEditFormData({});
      // 리스트 새로고침
      await handleGetList();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '데이터 수정에 실패했습니다.';
      setError(`에러: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // DELETE - 데이터 삭제
  const handleDelete = async (id: string) => {
    if (!id) {
      setError('삭제할 ID가 없습니다.');
      return;
    }
    if (!confirm('정말 이 여행지를 삭제하시겠습니까?')) {
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await deleteTravelApi(id);
      setSuccess('여행지가 성공적으로 삭제되었습니다!');
      // 리스트 새로고침
      await handleGetList();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '데이터 삭제에 실패했습니다.';
      setError(`에러: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#fdfbf7] text-stone-800 font-['Nunito'] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-stone-900">API 테스트 페이지</h1>
        <p className="text-stone-600 mb-8">여행지 데이터의 조회, 추가, 삭제를 테스트할 수 있습니다.</p>

        {/* 알림 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        {/* GET 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-stone-900">GET - 리스트 조회</h2>
            <button
              onClick={handleGetList}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '로딩 중...' : '새로고침'}
            </button>
          </div>
          {travelList.length > 0 && (
            <p className="text-sm text-stone-600">총 {travelList.length}개의 여행지</p>
          )}
        </div>

        {/* POST 섹션 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-stone-900">POST - 데이터 추가</h2>
          <form onSubmit={handlePost} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Region *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value as TravelCardApi['region'] })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="ASIA">ASIA</option>
                  <option value="EUROPE">EUROPE</option>
                  <option value="AFRICA">AFRICA</option>
                  <option value="AMERICA">AMERICA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 대한민국"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Destination Name *
                </label>
                <input
                  type="text"
                  value={formData.destination_name}
                  onChange={(e) => setFormData({ ...formData, destination_name: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 서울"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.date_start}
                  onChange={(e) => setFormData({ ...formData, date_start: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.date_end}
                  onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="여행지 설명을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Memo
              </label>
              <textarea
                value={formData.memo || ''}
                onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="메모를 입력하세요"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_confirmed"
                checked={formData.is_confirmed}
                onChange={(e) => setFormData({ ...formData, is_confirmed: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-stone-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="is_confirmed" className="ml-2 text-sm font-medium text-stone-700">
                확인됨 (is_confirmed)
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '추가 중...' : '여행지 추가하기'}
            </button>
          </form>
        </div>

        {/* 리스트 표시 */}
        {travelList.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
            <h2 className="text-2xl font-semibold mb-4 text-stone-900">여행지 리스트</h2>
            <div className="space-y-4">
              {travelList.map((travel, index) => (
                <div key={travel.id || `travel-${index}`}>
                  {editingId === travel.id ? (
                    // 수정 모드
                    <form onSubmit={(e) => handleUpdate(travel.id!, e)} className="p-4 border-2 border-blue-300 rounded-lg bg-blue-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Region *</label>
                          <select
                            value={editFormData.region}
                            onChange={(e) => setEditFormData({ ...editFormData, region: e.target.value as TravelCardApi['region'] })}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="ASIA">ASIA</option>
                            <option value="EUROPE">EUROPE</option>
                            <option value="AFRICA">AFRICA</option>
                            <option value="AMERICA">AMERICA</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Country *</label>
                          <input
                            type="text"
                            value={editFormData.country || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, country: e.target.value })}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Destination Name *</label>
                          <input
                            type="text"
                            value={editFormData.destination_name || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, destination_name: e.target.value })}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Image URL *</label>
                          <input
                            type="url"
                            value={editFormData.image_url || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, image_url: e.target.value })}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Start Date *</label>
                          <input
                            type="date"
                            value={editFormData.date_start || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, date_start: e.target.value })}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">End Date *</label>
                          <input
                            type="date"
                            value={editFormData.date_end || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, date_end: e.target.value })}
                            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                        <textarea
                          value={editFormData.description || ''}
                          onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                          className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id={`edit-confirmed-${travel.id}`}
                          checked={editFormData.is_confirmed || false}
                          onChange={(e) => setEditFormData({ ...editFormData, is_confirmed: e.target.checked })}
                          className="w-4 h-4 text-blue-600 border-stone-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={`edit-confirmed-${travel.id}`} className="ml-2 text-sm font-medium text-stone-700">
                          확인됨
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
                        >
                          {loading ? '저장 중...' : '저장'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="px-4 py-2 bg-stone-400 text-white rounded-lg hover:bg-stone-500 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
                        >
                          취소
                        </button>
                      </div>
                    </form>
                  ) : (
                    // 일반 보기 모드
                    <div className="p-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                              {travel.region}
                            </span>
                            {travel.id && (
                              <span className="text-xs text-stone-500">ID: {travel.id}</span>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-stone-900">
                            {travel.destination_name}
                          </h3>
                          <p className="text-stone-600">{travel.country}</p>
                          {travel.description && (
                            <p className="text-sm text-stone-500 mt-1">{travel.description}</p>
                          )}
                          <div className="flex gap-4 mt-2 text-xs text-stone-500">
                            <span>{travel.date_start}</span>
                            <span>~</span>
                            <span>{travel.date_end}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          {travel.is_confirmed && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              확인됨
                            </span>
                          )}
                          {travel.id && (
                            <>
                              <button
                                onClick={() => handleStartEdit(travel)}
                                disabled={loading}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDelete(travel.id!)}
                                disabled={loading}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
                              >
                                삭제
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          !loading && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 text-center text-stone-500">
              데이터가 없습니다. 위의 &quot;여행지 추가하기&quot; 버튼을 사용하여 데이터를 추가해보세요.
            </div>
          )
        )}
      </div>
    </main>
  );
}

