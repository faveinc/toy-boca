"use client";
import * as React from "react";
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTravelApi, putTravelApi } from '@/lib/travel/api';
import { TravelCardApi } from '@/lib/travel/types';
import { DateRangeDisplay } from '@/src/components/common/DateFormat';
import { TravelEditForm } from '@/src/components/travel/TravelEditForm';
import Link from 'next/link';

export default function TripManagePage() {
    const searchParams = useSearchParams();
    
    // URL에서 파라미터 가져오기
    const selectedIdsParam = searchParams.get('selectedIds');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const [travelList, setTravelList] = useState<TravelCardApi[]>([]);
    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // 선택된 인덱스 배열로 변환
    const selectedIds = useMemo(() => {
        if (!selectedIdsParam) return [];
        return selectedIdsParam.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    }, [selectedIdsParam]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getTravelApi();
            if (res && res.data) {
                setTravelList(res.data);
            } else if (Array.isArray(res)) {
                setTravelList(res);
            }
        };
        fetchData();
    }, []);

    // 선택된 카드 목록 필터링 (useMemo로 변경)
    const selectedCards = useMemo(() => {
        if (travelList.length === 0 || selectedIds.length === 0) return [];
        return selectedIds
            .map((index) => travelList[index])
            .filter((card) => card !== undefined);
    }, [travelList, selectedIds]);

    // 카드 저장 핸들러
    const handleSaveCard = async (cardId: string, data: Partial<TravelCardApi>) => {
        if (!cardId) {
            setError('카드 ID가 없습니다.');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await putTravelApi(cardId, data);
            setSuccess('여행지가 성공적으로 수정되었습니다!');
            setEditingCardId(null);
            // 리스트 새로고침
            const res = await getTravelApi();
            if (res && res.data) {
                setTravelList(res.data);
            } else if (Array.isArray(res)) {
                setTravelList(res);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '데이터 수정에 실패했습니다.';
            setError(`에러: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full bg-[#fdfbf7] text-stone-800 font-['Nunito'] pb-20">
            <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
                <header className="text-center mb-24">
                    <span className="block text-[#B8860B] text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">The 2025-2027 Edit</span>
                    <h1 className="text-5xl md:text-7xl text-[#1A1A1A] tracking-tight mb-6 font-serif">JOURNEYS</h1>
                    <div className="h-px w-24 bg-[#B8860B] mx-auto opacity-60"></div>
                </header>

                {/* 선택한 여행 기간 표시 */}
                {startDate && endDate && (
                    <div className="mb-8 flex items-center justify-center gap-2">
                        <div className="text-stone-600 text-sm">여행 기간:</div>
                        <DateRangeDisplay 
                            startDate={startDate} 
                            endDate={endDate}
                            showIcon={false}
                            separator=" ~ "
                            className="text-stone-700"
                        />
                        <Link 
                            href="/trip-calendar"
                            className="ml-2 text-blue-600 hover:text-blue-700 text-sm underline underline-offset-2 transition-colors"
                        >
                            재선택
                        </Link>
                    </div>
                )}

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

                {/* 선택된 여행지 목록 */}
                {selectedCards.length > 0 ? (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-stone-900 mb-6">
                            선택한 여행지 ({selectedCards.length}개)
                        </h2>
                        <div className="space-y-6">
                            {selectedCards.map((card, index) => (
                                <div key={card.id || `card-${index}`}>
                                    {editingCardId === card.id ? (
                                        <TravelEditForm
                                            card={card}
                                            onSave={async (data) => {
                                                if (card.id) {
                                                    await handleSaveCard(card.id, data);
                                                }
                                            }}
                                            onCancel={() => setEditingCardId(null)}
                                            isLoading={loading}
                                        />
                                    ) : (
                                        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 space-y-3">
                                                    {/* 나라 */}
                                                    <div>
                                                        <span className="text-sm text-stone-500">나라:</span>
                                                        <span className="ml-2 font-medium text-stone-900">{card.country}</span>
                                                    </div>
                                                    {/* 도시 */}
                                                    <div>
                                                        <span className="text-sm text-stone-500">도시:</span>
                                                        <span className="ml-2 font-medium text-stone-900">{card.destination_name}</span>
                                                    </div>
                                                    {/* 날짜 */}
                                                    <div>
                                                        <span className="text-sm text-stone-500">날짜:</span>
                                                        <span className="ml-2">
                                                            <DateRangeDisplay 
                                                                startDate={card.date_start} 
                                                                endDate={card.date_end}
                                                                showIcon={false}
                                                                separator=" ~ "
                                                                className="inline"
                                                            />
                                                        </span>
                                                    </div>
                                                    {/* 메모 */}
                                                    {card.memo && (
                                                        <div>
                                                            <span className="text-sm text-stone-500">메모:</span>
                                                            <p className="mt-1 text-stone-700 whitespace-pre-wrap">{card.memo}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                {card.id && (
                                                    <button
                                                        onClick={() => setEditingCardId(card.id!)}
                                                        disabled={loading}
                                                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        편집
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-stone-500 mb-4">선택된 여행지가 없습니다.</p>
                        <Link 
                            href="/trip-choose"
                            className="text-blue-600 hover:text-blue-700 underline"
                        >
                            여행지 선택하러 가기
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}