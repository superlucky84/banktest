import { h, mount, Fragment } from '@/engine';
import { makeDepartmentTree } from '@/helper/calculator';
import DepartmentTree from '@/components/DepartmentTree';
import UserList from '@/components/UserList';
import UserItem from '@/components/UserItem';
import { allMemberRef } from '@/store';
import type { Organ } from '@/types';

import data from '@/data.json';
console.log(data);

const Organ = mount(_renew => {
  const { departmentList, userList } = data as Organ;
  const { departmantTree } = makeDepartmentTree(departmentList);

  allMemberRef.value = userList.map(item => {
    return {
      ...item,
      departmentCodeList: item.departmentCodePath.split(';'),
      departmentNameList: item.departmentNamePath.split(';'),
    };
  });

  return () => (
    <Fragment>
      <div class="w-1/3 h-full bg-red-500 flex items-center justify-center">
        <DepartmentTree departmantTree={departmantTree} />
      </div>
      <div class="w-1/3 h-full bg-green-500 flex items-center justify-center">
        <UserList />
      </div>
      <div class="w-1/3 h-full bg-blue-500 flex items-center justify-center">
        <UserItem />
      </div>
    </Fragment>
  );
});

export default Organ;
