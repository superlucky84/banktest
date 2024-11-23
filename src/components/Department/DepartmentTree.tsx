import { h, mount } from '@/engine';
import type { Department } from '@/types';
import DepartmentItem from '@/components/Department/DepartmentItem';

const DepartmentTree = mount<{ departmantTree: Department }>(_renew => {
  return ({ departmantTree }) => (
    <ul class="pl-2">
      {departmantTree.children.map(item => (
        <DepartmentItem item={item} />
      ))}
    </ul>
  );
});

export default DepartmentTree;
