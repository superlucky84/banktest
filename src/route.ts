import { selectMemberRef } from '@/store';
import { selectedMemberWithTreeOpen, initSelect } from '@/store/storeAction';

export function makeRoute() {
  initSelect();

  // 히스토리 변경시 상태 변경
  window.addEventListener('popstate', _ => {
    const { pathname, search, origin } = window.location;

    const urlA = new URL(`${pathname}?userId=${selectMemberRef.id}`, origin);
    const urlB = new URL(`${pathname}${search}`, origin);

    execRoute(urlA, urlB, false);
  });
}

/**
 * 사용자가 쿼리 변경
 */
export function navigate(query: string) {
  const { pathname, search, origin } = window.location;

  const urlA = new URL(`${pathname}${search}`, origin);
  const urlB = new URL(`${pathname}${query}`, origin);

  execRoute(urlA, urlB, true);
}

/**
 * 공통 라우팅 처리
 */
function execRoute(urlA: URL, urlB: URL, isPush?: boolean) {
  if (urlA.pathname === urlB.pathname) {
    if (!urlB.search || urlA.search === urlB.search) {
      selectMemberRef.id = '';
    } else if (urlA.search !== urlB.search) {
      const userSearchParam = new URLSearchParams(urlB.search);
      const userId = userSearchParam.get('userId');
      if (userId) {
        selectedMemberWithTreeOpen(userId, Boolean(isPush));
      }
    }
  }

  if (isPush) {
    if (!selectMemberRef.id) {
      history.pushState(null, '', urlA.pathname);
    } else {
      history.pushState(null, '', `${urlB.pathname}${urlB.search}`);
    }
  }
}
