import { h, mount, Fragment, mountCallback } from '@/engine';
import { makeDepartmentTree } from '@/helper/calculator';
import clsx from '@/helper/clsx';
// import { computed } from '@/engine/helper';
import DepartmentTree from '@/components/DepartmentTree';
import Navi from '@/components/Navi';
import UserList from '@/components/UserList';
import data from '@/data.json';
import { makeRoute, navigate } from '@/route';
import UserItem from '@/components/UserItem';
import { allMemberRef, departmentListRef, selectedMemberWatch } from '@/store';

import {
  userSearchTextListWatch,
  departmentSearchTextListWatch,
} from '@/store/searchStore';
import type { Organ } from '@/types';

const Organ = mount(renew => {
  const { departmentList, userList } = data as Organ;
  const { departmantTree } = makeDepartmentTree(departmentList);
  const selectedMemberInfo = selectedMemberWatch(renew, s => [s.id]);
  const searchTextList = userSearchTextListWatch(renew);
  const departmentTextList = departmentSearchTextListWatch(renew);

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

  const handleSelectFromSearchUser = (userId: string) => {
    navigate(`?userId=${userId}`, true);
  };

  return () => (
    <Fragment>
      <Navi />
      <div class="flex w-full items-center justify-center h-full bg-gray-100">
        <div class="flex flex-col w-1/3 h-full bg-red-500 flex items-center justify-center relative">
          {searchTextList.value.length > 0 && (
            <ul class="absolute z-10 top-1.5 w-4/5 rounded-lg border border-gray-300 p-4 shadow-lg bg-white">
              {searchTextList.value.map(item => (
                <li
                  class={clsx('relative', {
                    'bg-stone-200': selectedMemberInfo.id === item.id,
                  })}
                  key={item.id}
                >
                  <button
                    onClick={() => handleSelectFromSearchUser(item.id)}
                    type="button"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <DepartmentTree departmantTree={departmantTree} />
        </div>
        <div class="flex flex-col w-1/3 h-full bg-green-500 flex items-center justify-center relative">
          {departmentTextList.value.length > 0 && (
            <ul class="absolute z-10 top-1.5 w-4/5 rounded-lg border border-gray-300 p-4 shadow-lg bg-white">
              {departmentTextList.value.map(item => (
                <li key={item.code}>{item.name}</li>
              ))}
            </ul>
          )}
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
