import { selectMemberRef, allMemberRef } from '@/store/userStore';

import {
  opendDepartmentCodesRef,
  selectedDepartmentRef,
  departmentListRef,
} from '@/store/departmentStore';

import {
  userSearchTextListRef,
  departmentSearchTextListRef,
} from '@/store/searchStore';

/**
 * 텍스트 검색창에 텍스트로 검색
 */
export function searchFromText(text: string) {
  const normalizedText = text.trim().toLowerCase(); // 공백 제거 및 소문자화

  const filteredMembers = normalizedText
    ? allMemberRef.value.filter(item => {
        return item.name.includes(normalizedText);
      })
    : [];
  userSearchTextListRef.value = filteredMembers;

  const filteredDepartment = normalizedText
    ? departmentListRef.value.filter(item => item.name.includes(normalizedText))
    : [];
  departmentSearchTextListRef.value = filteredDepartment;
}

/**
 * 선택과 동시에 트리 상태 변경
 */
export function selectedMemberWithTreeOpen(
  userId: string,
  changeTree: boolean
) {
  selectMemberRef.id = userId;

  let selectedMember = allMemberRef.value.find(item => item.id === userId);

  if (!selectedMember) {
    selectedMember = allMemberRef.value.find(item => item.id === 'choonsik');
    selectMemberRef.id = 'choonsik';
  }

  if (selectedMember && changeTree) {
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
