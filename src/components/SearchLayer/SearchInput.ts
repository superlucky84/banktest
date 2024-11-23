import { state } from '@/engine/helper';
import { searchFromText } from '@/store/action';
import { fMount, fTags } from '@/engine/ftags';

const { label, input, div } = fTags;

function debounce<T extends (...args: any[]) => void>(
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

const fSearchLayer = fMount(renew => {
  const textState = state<string>('', renew);
  const handleChangeKeyword = debounce((event: Event) => {
    const text = (event.target as HTMLInputElement).value;
    textState.value = text;
    searchFromText(text);
  }, 180);

  return () =>
    div(
      { class: 'mb-2' },
      div(
        { class: 'flex' },
        label(
          {
            for: 'search-dropdown',
            class: 'mb-2 text-sm font-medium text-gray-900 sr-only',
          },
          'Your Email'
        ),
        div(
          { class: 'relative w-full' },
          input({
            onInput: handleChangeKeyword,
            value: textState.value,
            type: 'search',
            class:
              'block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500',
            placeholder: 'Search',
            required: true,
          })
        )
      )
    );
});

export default fSearchLayer;
