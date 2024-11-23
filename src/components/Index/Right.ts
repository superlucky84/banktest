import { fMount, fTags, fFragment } from '@/engine/ftags';
const { div } = fTags;
import fUserItem from '@/components/User/UserItem';

const fRight = fMount<{
  isUserSelected: { v: boolean };
}>(() => {
  return ({ isUserSelected }) =>
    fFragment(
      isUserSelected.v &&
        div(
          {
            class: 'w-1/3 h-full bg-blue-500 flex items-center justify-center',
          },
          fUserItem()
        )
    );
});

export default fRight;
