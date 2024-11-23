import type { UserList, DepartmentList } from '@/types';
import { store } from '@/engine/helper';

export const userSearchTextListWatch = store<UserList>([]);
export const userSearchTextListRef = userSearchTextListWatch();

export const departmentSearchTextListWatch = store<DepartmentList>([]);
export const departmentSearchTextListRef = departmentSearchTextListWatch();
