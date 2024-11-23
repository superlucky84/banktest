import { state } from '@/engine/helper';
import { debounce } from '@/helper/debounce';
import { searchFromText } from '@/store/action';
import { fMount, fTags } from '@/engine/ftags';

const { input, div } = fTags;

const fSearchLayer = fMount(renew => {
  /**
   * 검색 텍스트
   */
  const textState = state<string>('', renew);

  /**
   * 검색 텍스트 변경 핸들러
   */
  const handleChangeKeyword = debounce((event: Event) => {
    const text = (event.target as HTMLInputElement).value;
    textState.value = text;
    searchFromText(text);
  }, 180);

  return () =>
    div(
      { class: 'flex mb-2 relative w-full' },
      input({
        onInput: handleChangeKeyword,
        value: textState.value,
        type: 'search',
        class:
          'block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500',
        placeholder: 'Search',
        required: true,
      })
    );
});

export default fSearchLayer;
