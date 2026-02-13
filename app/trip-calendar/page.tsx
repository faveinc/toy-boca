"use client";

import * as React from "react";
import { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar"; //라이브러리
import { addDays } from "date-fns";
import { type DateRange } from "react-day-picker"; //
import { Button } from "@/stories/Button";
import Link from "next/link";

export default function RangeCalendar() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isSelected,setIsSelected] = React.useState(false);
  
  useEffect(()=>{
  },[setIsSelected]);

  // 클라이언트에서만 초기값 설정
  React.useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    const initialFrom = new Date(today.getFullYear(), today.getMonth(), 12);
    const initialTo = addDays(initialFrom, 30);
    setDateRange({ from: initialFrom, to: initialTo });
  }, []);

  // 고정된 defaultMonth 사용 (hydration mismatch 방지)
  const defaultMonth = React.useMemo(() => new Date(), []);

  const isCompleteRange = !!(dateRange?.from && dateRange?.to);

  // 날짜를 URL 쿼리 파라미터 형식으로 변환
  const getDateQueryString = () => {
    if (!dateRange?.from || !dateRange?.to) return '';
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    return `?startDate=${formatDate(dateRange.from)}&endDate=${formatDate(dateRange.to)}`;
  };

  return (
    <main className="min-h-screen w-full bg-[#FAFAF8] selection:bg-[#B8860B]/20 selection:text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">

        <div className="calendar-head text-center mb-16">
          <span className="block text-[#B8860B] text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">TOY BOCA TRIP ROAD</span>
          <h1 className="text-5xl md:text-7xl text-[#1A1A1A] tracking-tight mb-6 font-serif">TRAVEL CALENDAR</h1>
          <span className="h-px w-24 bg-[#B8860B] mx-auto opacity-60 mb-8 inline-block"></span>
        </div>

        <div className="calendar-con flex flex-col items-center justify-center gap-2 mb-4">
          {isMounted && (
            <Calendar
              mode="range"
              defaultMonth={defaultMonth}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={3}
              className="rounded-lg border"
            />
          )}

          <div className="mt-6">
            {isCompleteRange ? (
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                여행 기간: {dateRange.from!.toLocaleDateString()} ~ {dateRange.to!.toLocaleDateString()}
              </p>
            ) : (
              <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                기간을 선택해주세요.
              </p>
            )}
          </div>
          <div className="rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200">
                {isCompleteRange ? (
                  <Link href={`/trip-choose${getDateQueryString()}`}>예약하기</Link>
                ) : (
                  <span className="">예약 날짜 선택하기</span>
                )}
          </div>
        </div>
        

       
      </div>
    </main>
  );
}
