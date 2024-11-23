import { render, mountCallback } from '@/engine';
import { computed } from '@/engine/helper';
import { makeDepartmentTree, normalizeUserField } from '@/helper/calculator';
import { fMount, fTags } from '@/engine/ftags';

import data from '@/data.json';
import fDepartmentTree from '@/components/Department/DepartmentTree';
import fDepartLayer from '@/components/SearchLayer/DepartLayer';
import fSearchInput from '@/components/SearchLayer/SearchInput';
import fUserList from '@/components/User/UserList';
import fUserLayer from '@/components/SearchLayer/UserLayer';
import fUserItem from '@/components/User/UserItem';

import { initNavigation } from '@/helper/navigation';
import clsx from '@/helper/clsx';
import { allMemberRef, selectedMemberWatch } from '@/store/userStore';
import { departmentListRef, departmentMapRef } from '@/store/departmentStore';
import type { Organ } from '@/types';
import '@/input.css';

const { div } = fTags;

const fRoot = fMount(renew => {
  const { departmentList, userList } = data as Organ;
  const { departmantTree, departmantMap } = makeDepartmentTree(departmentList);
  const selectedMemberInfo = selectedMemberWatch(renew, s => [s.id]);
  const isUserSelected = computed(() => Boolean(selectedMemberInfo.id));

  /**
   * 부서 데이터, 유저데이트 스토어에 등록
   */
  departmentListRef.value = departmentList;
  departmentMapRef.value = departmantMap;
  allMemberRef.value = normalizeUserField(userList);

  /**
   * 부서 데이터, 유저데이트 스토어에 등록
   */
  mountCallback(() => {
    initNavigation();
  });

  return () =>
    div(
      {
        class: 'w-4/5 max-w-xl h-[80vh] flex flex-col text-white',
      },
      fSearchInput(),
      div(
        {
          class: 'flex w-full items-center justify-left h-full bg-gray-100',
        },
        div(
          {
            class: clsx(
              'flex flex-col transition-width duration-300',
              isUserSelected.v ? 'w-1/3' : 'w-1/2',
              'h-full bg-red-500 flex items-center justify-center relative'
            ),
          },
          fDepartLayer(),
          fDepartmentTree({
            departmantTree: departmantTree,
          })
        ),
        div(
          {
            class: clsx(
              'flex flex-col transition-width duration-300',
              isUserSelected.v ? 'w-1/3' : 'w-1/2',
              'h-full bg-green-500 flex items-center justify-center relative'
            ),
          },
          fUserLayer(),
          fUserList()
        ),
        isUserSelected.value &&
          div(
            {
              class:
                'w-1/3 h-full bg-blue-500 flex items-center justify-center',
            },
            fUserItem()
          )
      )
    );
});

render(fRoot(), document.body);
