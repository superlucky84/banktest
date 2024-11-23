import type { UserList, DepartmentList } from '@/types';
import { store } from '@/engine/helper';

/**
 * 텍스트 검색 결과 구독함수
 */
export const userSearchTextListWatch = store<UserList>([]);
export const departmentSearchTextListWatch = store<DepartmentList>([]);

/**
 * 텍스트 검색 결과 참조
 */
export const userSearchTextListRef = userSearchTextListWatch();
export const departmentSearchTextListRef = departmentSearchTextListWatch();
