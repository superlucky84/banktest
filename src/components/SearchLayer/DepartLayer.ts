import clsx from '@/helper/clsx';
import { findAllParentCode } from '@/helper/calculator';
import { fMount, fTags, fFragment } from '@/engine/ftags';

const { ul, li, button } = fTags;

import {
  selectedDepartmentWatch,
  opendDepartmentCodesWatch,
  departmentMapRef,
} from '@/store/departmentStore';
import { departmentSearchTextListWatch } from '@/store/searchStore';

const fDepartLayer = fMount(renew => {
  const selectedCode = selectedDepartmentWatch(renew, s => [s.code]);
  const opnedList = opendDepartmentCodesWatch(renew);
  const departmentTextList = departmentSearchTextListWatch(renew);

  /**
   * 해당 코드를 포함하는 모든 부모 코드를 전부 펼침
   */
  const handleSelectFromSearchDepart = (code: string) => {
    selectedCode.code = code;

    const acc = findAllParentCode(departmentMapRef.value[code], [code]);
    opnedList.value = [...new Set([...opnedList.value, ...acc])];
  };

  return () =>
    fFragment(
      departmentTextList.value.length > 0 &&
        ul(
          {
            class:
              'absolute z-10 top-1.5 w-4/5 rounded-lg border border-gray-300 p-4 shadow-lg text-black bg-white',
          },
          departmentTextList.value.map(item =>
            li(
              {
                class: clsx('relative', {
                  'bg-zinc-400': selectedCode.code === item.code,
                }),
                key: item.code,
              },
              button(
                {
                  type: 'button',
                  onClick: () => handleSelectFromSearchDepart(item.code),
                },
                item.name
              )
            )
          )
        )
    );
});

export default fDepartLayer;
