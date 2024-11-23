import type { UserList, User } from '@/types';
import { store } from '@/engine/helper';

/**
 * 모든맴버구독함수
 */
export const allMembersWatch = store<UserList>([]);

/**
 * 모든맴버 참조객체
 */
export const allMemberRef = allMembersWatch();

/**
 * 선택된 멤버
 */
export const selectedMemberWatch = store<{
  id: string;
  info: User | null;
}>({
  id: '',
  info: null,
});

/**
 * 선택멤버 참조객체
 */
export const selectMemberRef = selectedMemberWatch();

/**
 * 선택멤버 아이디가 변경하면 info를 자동으로 채워준다
 */
selectedMemberWatch(
  state => {
    const info = allMemberRef.value.find(item => state.id === item.id);
    if (info && state.id) {
      state.info = info;
    } else {
      state.info = null;
    }
  },
  state => [state.id]
);
