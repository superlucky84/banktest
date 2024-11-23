import type { User } from '@/types';
import { computed } from '@/engine/helper';
import { h, mount, Fragment } from '@/engine';
import { selectedMemberWatch } from '@/store/userStore';

const UserItem = mount(renew => {
  const userInfo = selectedMemberWatch(renew, s => [s.info]);
  const info = computed<User | null>(() => userInfo.info);

  return () => (
    <Fragment>
      {info.v ? (
        <ul>
          <li>아이디: {info.v.id}</li>
          <li>이름: {info.v.name}</li>
          <li>팀: {info.v.departmentName}</li>
          <li>직책: {info.v.dutyName}</li>
          <li>번호: {info.v.telephoneNumber}</li>
        </ul>
      ) : null}
    </Fragment>
  );
});

export default UserItem;
