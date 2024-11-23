import type { User } from '@/types';
import { computed } from '@/engine/helper';
import { fMount, fTags, fFragment } from '@/engine/ftags';
import { selectedMemberWatch } from '@/store/userStore';

const { ul, li } = fTags;

const fUserItem = fMount(renew => {
  const userInfo = selectedMemberWatch(renew, s => [s.info]);
  const info = computed<User | null>(() => userInfo.info);

  return () =>
    fFragment(
      info.v
        ? ul(
            li('아이디: ', info.v.id),
            li('이름: ', info.v.name),
            li('팀: ', info.v.departmentName),
            li('직책: ', info.v.dutyName),
            li('번호: ', info.v.telephoneNumber)
          )
        : null
    );
});

export default fUserItem;
