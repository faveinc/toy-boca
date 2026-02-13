/**
 * 이미지 URL 유효성 검사 유틸리티
 * @param url - 검사할 URL 문자열
 * @returns URL이 유효한지 여부
 */
export const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url || url.trim() === '') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * 안전한 이미지 URL 반환 (유효하지 않으면 null)
 * @param url - 이미지 URL
 * @returns 유효한 URL 또는 null
 */
export const getSafeImageUrl = (url: string | undefined): string | null => {
  return isValidImageUrl(url) ? url || null : null;
};

/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷팅
 * @param dateString - ISO 날짜 문자열 (예: "2026-01-31T15:00:00.000Z")
 * @returns 포맷팅된 날짜 문자열 (예: "2026.01.31")
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // 유효하지 않은 날짜면 원본 반환
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}.${month}.${day}`;
  } catch {
    return dateString; // 파싱 실패 시 원본 반환
  }
};

/**
 * 날짜 문자열을 HTML date input 형식(YYYY-MM-DD)으로 변환
 * @param dateString - ISO 날짜 문자열 또는 YYYY-MM-DD 형식
 * @returns YYYY-MM-DD 형식의 날짜 문자열
 */
export const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return '';
  
  try {
    // 이미 YYYY-MM-DD 형식인 경우 그대로 반환
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // ISO 형식이나 다른 형식인 경우 변환
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // 유효하지 않은 날짜면 빈 문자열 반환
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch {
    return ''; // 파싱 실패 시 빈 문자열 반환
  }
};

/**
 * 날짜 범위가 겹치는지 확인
 * @param travelStart - 여행지 시작일 (YYYY-MM-DD 또는 ISO 형식)
 * @param travelEnd - 여행지 종료일 (YYYY-MM-DD 또는 ISO 형식)
 * @param selectedStart - 선택한 시작일 (YYYY-MM-DD 형식)
 * @param selectedEnd - 선택한 종료일 (YYYY-MM-DD 형식)
 * @returns 날짜 범위가 겹치면 true
 */
export const isDateRangeOverlapping = (
  travelStart: string,
  travelEnd: string,
  selectedStart: string,
  selectedEnd: string
): boolean => {
  try {
    const travelStartDate = new Date(travelStart);
    const travelEndDate = new Date(travelEnd);
    const selectedStartDate = new Date(selectedStart);
    const selectedEndDate = new Date(selectedEnd);

    // 날짜만 비교하기 위해 시간 부분 제거
    travelStartDate.setHours(0, 0, 0, 0);
    travelEndDate.setHours(0, 0, 0, 0);
    selectedStartDate.setHours(0, 0, 0, 0);
    selectedEndDate.setHours(0, 0, 0, 0);

    // 날짜 범위가 겹치는 조건: travelStart <= selectedEnd && travelEnd >= selectedStart
    return travelStartDate <= selectedEndDate && travelEndDate >= selectedStartDate;
  } catch {
    return false; // 날짜 파싱 실패 시 false 반환
  }
};

