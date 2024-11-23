import type { UserList, User } from '@/types';
import { store } from '@/engine/helper';

/**
 * 모든맴버
 */
// 구독함수
export const allMembersWatch = store<UserList>([]);
//  모든맴버 참조객체
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
export const selectMemberRef = selectedMemberWatch();

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
