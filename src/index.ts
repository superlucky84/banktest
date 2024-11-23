import { render, mountCallback } from '@/engine';
import { computed } from '@/engine/helper';
import { fMount, fTags } from '@/engine/ftags';

import { makeDepartmentTree, normalizeUserField } from '@/helper/calculator';
import { initNavigation } from '@/helper/navigation';

import fSearchInput from '@/components/SearchLayer/SearchInput';
import fLeft from '@/components/Index/Left';
import fCenter from '@/components/Index/Center';
import fRight from '@/components/Index/Right';

import { allMemberRef, selectedMemberWatch } from '@/store/userStore';
import { departmentListRef, departmentMapRef } from '@/store/departmentStore';

import data from '@/data.json';
import '@/input.css';
import type { Organ } from '@/types';
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
        fLeft({ isUserSelected, departmantTree }),
        fCenter({ isUserSelected }),
        fRight({ isUserSelected })
      )
    );
});

render(fRoot(), document.body);
