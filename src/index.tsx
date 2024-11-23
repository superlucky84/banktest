import { h, mount, render, mountCallback } from '@/engine';
import { makeDepartmentTree } from '@/helper/calculator';
import DepartmentTree from '@/components/Department/DepartmentTree';
import DepartLayer from '@/components/SearchLayer/DepartLayer';
import SearchInput from '@/components/SearchLayer/SearchInput';
import UserList from '@/components/User/UserList';
import UserLayer from '@/components/SearchLayer/UserLayer';
import data from '@/data.json';
import { makeRoute } from '@/route';
import UserItem from '@/components/User/UserItem';
import { allMemberRef } from '@/store/userStore';
import { departmentListRef } from '@/store/departmentStore';

import type { Organ } from '@/types';
import '@/input.css';

// https://github.com/themesberg/flowbite-admin-dashboard

const Root = mount(() => {
  const { departmentList, userList } = data as Organ;
  const { departmantTree } = makeDepartmentTree(departmentList);

  departmentListRef.value = departmentList;

  allMemberRef.value = userList.map(item => {
    return {
      ...item,
      departmentCodeList: item.departmentCodePath.split(';'),
      departmentNameList: item.departmentNamePath.split(';'),
    };
  });

  mountCallback(() => {
    makeRoute();
  });

  return () => (
    <div class="w-4/5 max-w-xl h-[80vh] flex flex-col text-white">
      <SearchInput />
      <div class="flex w-full items-center justify-center h-full bg-gray-100">
        <div class="flex flex-col w-1/3 h-full bg-red-500 flex items-center justify-center relative">
          <DepartLayer />
          <DepartmentTree departmantTree={departmantTree} />
        </div>
        <div class="flex flex-col w-1/3 h-full bg-green-500 flex items-center justify-center relative">
          <UserLayer />
          <UserList />
        </div>
        <div class="w-1/3 h-full bg-blue-500 flex items-center justify-center">
          <UserItem />
        </div>
      </div>
    </div>
  );
});

render(<Root />, document.body);
