import type { UserList, User } from '@/types';
// import { state, computed } from '@/engine/helper';
import { h, mount } from '@/engine';
import clsx from '@/helper/clsx';
import { selectedDepartmentWatch, selectedMemberWatch } from '@/store';
import { navigate } from '@/route';
// import clsx from '@/helper/clsx';

const UserList = mount(renew => {
  const departmentUserInfo = selectedDepartmentWatch(renew, s => [s.members]);
  const selectedMemberInfo = selectedMemberWatch(renew, s => [s.id]);

  const handleSelect = (item: User) => {
    navigate('?userId=' + item.id);
  };

  return () => (
    <ul>
      {departmentUserInfo.members.map(item => (
        <li
          key={item.id}
          class={clsx('relative', {
            'bg-zinc-400': selectedMemberInfo.id === item.id,
          })}
        >
          <button onClick={() => handleSelect(item)}>{item.name}</button>
        </li>
      ))}
    </ul>
  );
});

export default UserList;
