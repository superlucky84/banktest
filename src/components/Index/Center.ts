import { fMount, fTags } from '@/engine/ftags';
const { div } = fTags;
import clsx from '@/helper/clsx';

import fUserList from '@/components/User/UserList';
import fUserLayer from '@/components/SearchLayer/UserLayer';

const fCenter = fMount<{ isUserSelected: { v: boolean } }>(_renew => {
  return ({ isUserSelected }) =>
    div(
      {
        class: clsx(
          'flex flex-col transition-width duration-300',
          isUserSelected.v ? 'w-1/3' : 'w-1/2',
          'h-full bg-green-500 flex items-center justify-center relative'
        ),
      },
      fUserLayer(),
      fUserList()
    );
});

export default fCenter;
