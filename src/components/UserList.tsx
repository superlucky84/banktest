import type { UserList, User } from '@/types';
// import { state, computed } from '@/engine/helper';
import { h, mount } from '@/engine';
import { selectedDepartmentWatch } from '@/store';
import { navigate } from '@/route';
// import clsx from '@/helper/clsx';

const UserList = mount(renew => {
  const selectedUserList = selectedDepartmentWatch(renew, s => [s.members]);

  const handleSelect = (item: User) => {
    console.log(item);
    navigate(item.id);
    // navigate("/organ?userId=" + item.id);
  };

  return () => (
    <ul>
      {selectedUserList.members.map(item => (
        <li key={item.id}>
          <button onClick={() => handleSelect(item)}>{item.name}</button>
        </li>
      ))}
    </ul>
  );
});

export default UserList;
