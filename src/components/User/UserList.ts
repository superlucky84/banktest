import { fMount, fTags } from '@/engine/ftags';
import clsx from '@/helper/clsx';
import { navigate } from '@/helper/navigation';

import type { User } from '@/types';
const { ul, li, button } = fTags;

import { selectedDepartmentWatch } from '@/store/departmentStore';
import { selectedMemberWatch } from '@/store/userStore';

const fUserList = fMount(renew => {
  const departmentUserInfo = selectedDepartmentWatch(renew, s => [s.members]);
  const selectedMemberInfo = selectedMemberWatch(renew, s => [s.id]);

  const handleSelect = (item: User) => {
    navigate('?userId=' + item.id);
  };

  return () =>
    ul(
      departmentUserInfo.members.map(item =>
        li(
          {
            key: item.id,
            class: clsx('relative', {
              'bg-zinc-400': selectedMemberInfo.id === item.id,
            }),
          },
          button({ onClick: () => handleSelect(item) }, item.name)
        )
      )
    );
});

export default fUserList;
