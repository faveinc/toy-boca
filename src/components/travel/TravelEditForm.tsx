'use client';
import * as React from "react";
import { useState, useEffect } from 'react';
import { TravelCardApi } from '@/lib/travel/types';
import { formatDateForInput } from '@/lib/travel/utils';

type Props = {
  card: TravelCardApi;
  onSave: (data: Partial<TravelCardApi>) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
};

export const TravelEditForm = ({ card, onSave, onCancel, isLoading = false }: Props) => {
  // 날짜를 HTML date input 형식(YYYY-MM-DD)으로 변환
  const [formData, setFormData] = useState<Partial<TravelCardApi>>({
    date_start: formatDateForInput(card.date_start),
    date_end: formatDateForInput(card.date_end),
    memo: card.memo || '',
  });

  // card가 변경될 때마다 날짜 업데이트
  useEffect(() => {
    setFormData({
      date_start: formatDateForInput(card.date_start),
      date_end: formatDateForInput(card.date_end),
      memo: card.memo || '',
    });
  }, [card]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 날짜와 memo만 전달
    await onSave({
      date_start: formData.date_start,
      date_end: formData.date_end,
      memo: formData.memo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-stone-200">
      <div className="space-y-4">
        {/* 읽기 전용 정보 표시 */}
        <div className="mb-4 p-4 bg-stone-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-stone-500">나라:</span>
              <span className="ml-2 font-medium text-stone-900">{card.country}</span>
            </div>
            <div>
              <span className="text-stone-500">도시:</span>
              <span className="ml-2 font-medium text-stone-900">{card.destination_name}</span>
            </div>
            <div>
              <span className="text-stone-500">지역:</span>
              <span className="ml-2 font-medium text-stone-900">{card.region}</span>
            </div>
          </div>
        </div>

        {/* 편집 가능한 필드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.date_start || ''}
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
              value={formData.date_end || ''}
              onChange={(e) => setFormData({ ...formData, date_end: e.target.value })}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Memo
          </label>
          <textarea
            value={formData.memo || ''}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="메모를 입력하세요"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '저장 중...' : '저장'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 bg-stone-400 text-white rounded-lg hover:bg-stone-500 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
            >
              취소
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

