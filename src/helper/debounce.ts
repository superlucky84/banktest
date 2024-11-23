/**
 * 이벤트 디바운서
 */
export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  let timer: number | null = null; // 브라우저 환경에서는 number 타입 사용
  return (...args: Parameters<T>) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => callback(...args), delay);
  };
}
