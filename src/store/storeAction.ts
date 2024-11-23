import {
  selectMemberRef,
  allMemberRef,
  opendDepartmentCodesRef,
  selectedDepartmentRef,
} from '@/store';

// 선택과 동시에 트리 오픈
export function selectedMemberWithTreeOpen(userId: string, isPush: boolean) {
  selectMemberRef.id = userId;

  let selectedMember = allMemberRef.value.find(item => item.id === userId);

  if (!selectedMember) {
    selectedMember = allMemberRef.value.find(item => item.id === 'choonsik');
    selectMemberRef.id = 'choonsik';
  }

  if (selectedMember && !isPush) {
    opendDepartmentCodesRef.value = [
      ...new Set([
        ...opendDepartmentCodesRef.value,
        ...selectedMember.departmentCodeList,
      ]),
    ];
    selectedDepartmentRef.code = selectedMember.departmentCode;
  }
}

/**
 * 앱 진입시 초기상태 세팅
 */
export function initSelect() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('userId') || 'choonsik';
  selectMemberRef.id = userId || 'choonsik';

  let selectedMember = allMemberRef.value.find(item => item.id === userId);

  if (!selectedMember) {
    selectedMember = allMemberRef.value.find(item => item.id === 'choonsik');
    selectMemberRef.id = 'choonsik';
  }

  if (selectedMember) {
    opendDepartmentCodesRef.value = [...selectedMember.departmentCodeList];
    selectedDepartmentRef.code = selectedMember.departmentCode;
  }
}
