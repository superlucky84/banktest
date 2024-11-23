import { h, mount, Fragment } from '@/engine';
import clsx from '@/helper/clsx';

import { selectedDepartmentWatch, opendDepartmentCodesWatch } from '@/store';
import { departmentSearchTextListWatch } from '@/store/searchStore';

const DepartLayer = mount(renew => {
  const selectedCode = selectedDepartmentWatch(renew, s => [s.code]);
  const opnedList = opendDepartmentCodesWatch(renew);
  const departmentTextList = departmentSearchTextListWatch(renew);

  const handleSelectFromSearchDepart = (code: string) => {
    selectedCode.code = code;
    const index = opnedList.value.indexOf(code);

    if (index === -1) {
      opnedList.value = [...opnedList.value, code];
    }
  };

  return () => (
    <Fragment>
      {departmentTextList.value.length > 0 && (
        <ul class="absolute z-10 top-1.5 w-4/5 rounded-lg border border-gray-300 p-4 shadow-lg bg-white">
          {departmentTextList.value.map(item => (
            <li
              class={clsx('relative', {
                'bg-stone-200': selectedCode.code === item.code,
              })}
              key={item.code}
            >
              <button
                type="button"
                onClick={() => handleSelectFromSearchDepart(item.code)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
});

export default DepartLayer;
