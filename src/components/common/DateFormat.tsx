/**
 * 날짜 표시 컴포넌트
 * ISO 날짜 문자열을 YYYY.MM.DD 형식으로 포맷팅하여 표시
 */
import { formatDate } from '@/lib/travel/utils';

type DateDisplayProps = {
  date: string | undefined;
  className?: string;
  showIcon?: boolean;
};

export const DateDisplay = ({ date, className = '', showIcon = false }: DateDisplayProps) => {
  const formattedDate = formatDate(date);

  if (!formattedDate) return null;

  return (
    <span className={className}>
      {showIcon && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="lucide lucide-calendar w-3.5 h-3.5 mr-1.5 text-stone-400 inline-block"
          aria-hidden="true"
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
      )}
      {formattedDate}
    </span>
  );
};

/**
 * 날짜 범위 표시 컴포넌트
 * 시작일과 종료일을 함께 표시
 */
type DateRangeDisplayProps = {
  startDate: string | undefined;
  endDate: string | undefined;
  className?: string;
  showIcon?: boolean;
  separator?: string;
};

export const DateRangeDisplay = ({ 
  startDate, 
  endDate, 
  className = '', 
  showIcon = false,
  separator = ' ~ '
}: DateRangeDisplayProps) => {
  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);

  if (!formattedStart && !formattedEnd) return null;

  return (
    <div className={`date flex items-center text-xs text-stone-500 font-semibold uppercase tracking-wide ${className}`}>
      {showIcon && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="lucide lucide-calendar w-3.5 h-3.5 mr-1.5 text-stone-400"
          aria-hidden="true"
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
      )}
      {formattedStart && <div className="startDate">{formattedStart}</div>}
      {formattedStart && formattedEnd && <span className="mx-2">{separator}</span>}
      {formattedEnd && <div className="endDate">{formattedEnd}</div>}
    </div>
  );
};

