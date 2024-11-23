import type { UserList, Department, DepartmentList } from '@/types';

import { departmentMapRef } from '@/store/departmentStore';

/**
 * 부서 트리 만들기
 */
export function makeDepartmentTree(departmentList: DepartmentList) {
  const departmantMap = departmentList.reduce((acc, item) => {
    acc[item.code] = { ...item, children: [] };
    return acc;
  }, {} as Record<string, Department>);

  const departmantTree = departmentList.reduce(
    (acc, listItem: Department) => {
      const isRoot = listItem.parentCode === '0';
      const parentItem = departmantMap[listItem.parentCode];
      const item = departmantMap[listItem.code];

      if (isRoot && acc.children) {
        acc.children.push(item);
      } else if (parentItem.children) {
        parentItem.children.push(item);
      }
      return acc;
    },
    { code: '0', parentCode: '0', name: 'ROOT', children: [] } as Department
  );

  return { departmantTree, departmantMap };
}

/**
 * 해당 부서의 모든 부모 부서 코드 리턴
 */
export function findAllParentCode(dpartment: Department, acc: string[]) {
  const parentCode = dpartment.parentCode;

  if (parentCode && parentCode !== '0') {
    acc.push(parentCode);

    return findAllParentCode(departmentMapRef.value[parentCode], acc);
  }
  return acc;
}

/**
 * 유저 리스트의 특정 필드를 다루기 쉽도록 추가
 */
export function normalizeUserField(userList: UserList) {
  return userList.map(item => {
    return {
      ...item,
      departmentCodeList: item.departmentCodePath.split(';'),
      departmentNameList: item.departmentNamePath.split(';'),
    };
  });
}
