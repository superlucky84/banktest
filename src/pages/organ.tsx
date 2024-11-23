import { h, mount, Fragment, mountCallback } from '@/engine';
import { makeDepartmentTree } from '@/helper/calculator';
// import { computed } from '@/engine/helper';
import DepartmentTree from '@/components/DepartmentTree';
import Navi from '@/components/Navi';
import UserList from '@/components/UserList';
import { makeRoute } from '@/route';
import UserItem from '@/components/UserItem';
import { allMemberRef } from '@/store';
import { userSearchTextListWatch } from '@/store/searchStore';
import type { Organ } from '@/types';

import data from '@/data.json';
console.log(data);

const Organ = mount(renew => {
  const { departmentList, userList } = data as Organ;
  const { departmantTree } = makeDepartmentTree(departmentList);
  const searchTextList = userSearchTextListWatch(renew);

  /*
  const hasSearchText = computed<boolean>(
    () => searchTextList.value.length > 0
  );
   */

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
    <Fragment>
      <Navi />
      <div class="flex w-full items-center justify-center h-full bg-gray-100">
        <div class="flex flex-col w-1/3 h-full bg-red-500 flex items-center justify-center relative">
          {searchTextList.value.length > 0 && (
            <ul class="absolute top-1.5 w-4/5 rounded-lg border border-gray-300 p-4 shadow-lg bg-white">
              {searchTextList.value.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
          <DepartmentTree departmantTree={departmantTree} />
        </div>
        <div class="w-1/3 h-full bg-green-500 flex items-center justify-center">
          <UserList />
        </div>
        <div class="w-1/3 h-full bg-blue-500 flex items-center justify-center">
          <UserItem />
        </div>
      </div>
    </Fragment>
  );
});

export default Organ;
