import type { Department } from '@/types';
import { fMount, fTags } from '@/engine/ftags';
import fDepartmentItem from '@/components/Department/DepartmentItem';

const { ul } = fTags;

const fDepartmentTree = fMount<{ departmantTree: Department }>(_renew => {
  return ({ departmantTree }) =>
    ul(
      { class: 'pl-2' },
      departmantTree.children.map(item => fDepartmentItem({ item }))
    );
});

export default fDepartmentTree;
