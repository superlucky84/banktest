import { fMount, fTags } from '@/engine/ftags';
const { div } = fTags;
import clsx from '@/helper/clsx';
import fDepartmentTree from '@/components/Department/DepartmentTree';
import fDepartLayer from '@/components/SearchLayer/DepartLayer';

import { Department } from '@/types';

const fLeft = fMount<{
  departmantTree: Department;
  isUserSelected: { v: boolean };
}>(() => {
  return ({ departmantTree, isUserSelected }) =>
    div(
      {
        class: clsx(
          'flex flex-col transition-width duration-300',
          isUserSelected.v ? 'w-1/3' : 'w-1/2',
          'h-full bg-red-500 flex items-center justify-center relative'
        ),
      },
      fDepartLayer(),
      fDepartmentTree({ departmantTree })
    );
});

export default fLeft;
