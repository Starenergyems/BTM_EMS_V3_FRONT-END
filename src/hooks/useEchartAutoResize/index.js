import { useEffect, useRef } from 'react';
import { debounce } from 'throttle-debounce';

//讓 echart的圖隨著視窗變動或其他因素導致chart的大小發生變化時，重新繪製
export function useEchartAutoResize(
  chartElementRef,
  chartInstanceRef,
  { delay = 150 } = {},
) {
  const debounceFnRef = useRef(null);
  const observeRef = useRef(null);

  useEffect(() => {
    if (!chartElementRef.current) return;

    // 創建 debounce 函數並保存到 ref
    debounceFnRef.current = debounce(delay, () =>
      chartInstanceRef.current?.resize(),
    );

    observeRef.current = new ResizeObserver(debounceFnRef.current);
    observeRef.current.observe(chartElementRef.current);

    return () => {
      observeRef.current?.disconnect();
    };
  }, [chartElementRef, chartInstanceRef, delay]);
}
