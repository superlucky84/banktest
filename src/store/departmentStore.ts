import { store } from '@/engine/helper';
import { ref } from '@/engine';
import { allMemberRef } from '@/store/userStore';
import type { UserList, DepartmentList } from '@/types';

/**
 * 모든부서 리스트
 */
export const departmentListRef = ref<DepartmentList>([]);

/**
 * 선택된 부서 구독함수
 */
export const selectedDepartmentWatch = store<{
  code: string;
  members: UserList;
}>({
  code: '',
  members: [],
});
export const selectedDepartmentRef = selectedDepartmentWatch();

/**
 * 선택된 부서 코드 변경시 사이드 이팩트
 */
selectedDepartmentWatch(
  state => {
    const filteredList = allMemberRef.value.filter(
      item => state.code && item.departmentCodeList.includes(state.code)
    );
    state.members = filteredList;
  },
  state => [state.code]
);

/**
 * 펼쳐진 트리 코드 리스트
 */
export const opendDepartmentCodesWatch = store<string[]>([]);
export const opendDepartmentCodesRef = opendDepartmentCodesWatch();
