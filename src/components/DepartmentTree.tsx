import { computed } from '@/engine/helper';
import { h, mount, Fragment } from '@/engine';
import { selectedDepartmentWatch, opendDepartmentCodesWatch } from '@/store';
import clsx from '@/helper/clsx';
import type { Department } from '@/types';

const DepartmentTree = mount<{ departmantTree: Department }>(_renew => {
  return ({ departmantTree }) => (
    <ul class="pl-2">
      {departmantTree.children.map(item => (
        <DepartmentItem item={item} />
      ))}
    </ul>
  );
});

const DepartmentItem = mount<{ item: Department }>((renew, props) => {
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

  return ({ item }) => (
    <Fragment>
      <li class={clsx('relative', { 'bg-stone-200': isSelected.value })}>
        {hasChildren.value && (
          <button class="absolute -left-3" onClick={handleToggle}>
            {opnedList.value.includes(item.code) ? '-' : '+'}
          </button>
        )}
        <button onClick={() => handleSelect(item.code)}>{item.name}</button>
      </li>
      {hasChildren.value && opnedList.value.includes(item.code) && (
        <DepartmentTree departmantTree={item} />
      )}
    </Fragment>
  );
});

export default DepartmentTree;
