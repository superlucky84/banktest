import { WDom } from '@/engine';
import { computed } from '@/engine/helper';
import { fMount, fTags, fFragment } from '@/engine/ftags';
import {
  selectedDepartmentWatch,
  opendDepartmentCodesWatch,
} from '@/store/departmentStore';
import clsx from '@/helper/clsx';
import type { Department } from '@/types';
import fDepartmentTree from '@/components/Department/DepartmentTree';

const { li, button } = fTags;

const fDepartmentItem = fMount<{ item: Department }>((renew, props) => {
  const opnedList = opendDepartmentCodesWatch(renew);

  /**
   * 스토어에서 선택부서 코드만 구독
   */
  const selectedCode = selectedDepartmentWatch(renew, state => [state.code]);
  const hasChildren = computed<boolean>(() => props.item.children.length > 0);

  /**
   * 선택 상태
   */
  const isSelected = computed<boolean>(
    () => selectedCode.code === props.item.code
  );

  const handleToggle = () => {
    const code = props.item.code;
    const index = opnedList.value.indexOf(code);
    if (index === -1) {
      opnedList.value = [...opnedList.value, code];
    } else {
      opnedList.value = opnedList.value.filter(item => item !== code);
    }
  };

  const handleSelect = (code: string) => {
    selectedCode.code = code;
    const index = opnedList.value.indexOf(code);

    if (index === -1) {
      opnedList.value = [...opnedList.value, code];
    }
  };

  return ({ item }): WDom =>
    fFragment(
      li(
        {
          class: clsx('relative', { 'bg-zinc-400': isSelected.value }),
        },
        hasChildren.value &&
          button(
            {
              class: 'absolute -left-3',
              onClick: handleToggle,
            },
            opnedList.value.includes(item.code) ? '-' : '+'
          ),
        button(
          {
            onClick: () => handleSelect(item.code),
          },
          item.name
        )
      ),
      hasChildren.value &&
        opnedList.value.includes(item.code) &&
        fDepartmentTree({ departmantTree: item })
    );
});

export default fDepartmentItem;
