import { h, mount, Fragment } from '@/engine';
import { selectedMemberWatch } from '@/store/userStore';
import { userSearchTextListWatch } from '@/store/searchStore';
import { navigate } from '@/helper/navigation';
import clsx from '@/helper/clsx';

const UserLayer = mount(renew => {
  const selectedMemberInfo = selectedMemberWatch(renew, s => [s.id]);
  const searchTextList = userSearchTextListWatch(renew);

  const handleSelectFromSearchUser = (userId: string) => {
    navigate(`?userId=${userId}`, true);
  };

  return () => (
    <Fragment>
      {searchTextList.value.length > 0 && (
        <ul class="absolute z-10 top-1.5 w-4/5 rounded-lg border border-gray-300 p-4 shadow-lg text-black bg-white">
          {searchTextList.value.map(item => (
            <li
              class={clsx('relative', {
                'bg-zinc-400': selectedMemberInfo.id === item.id,
              })}
              key={item.id}
            >
              <button
                onClick={() => handleSelectFromSearchUser(item.id)}
                type="button"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
});

export default UserLayer;
