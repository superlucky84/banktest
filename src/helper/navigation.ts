import { selectMemberRef } from '@/store/userStore';
import { selectedMemberWithTreeOpen, initSelect } from '@/store/action';

/**
 * popState 이벤트 바인딩 및 초기상태 세팅
 */
export function initNavigation() {
  initSelect();

  window.addEventListener('popstate', _ => {
    const { pathname, search, origin } = window.location;

    const urlA = new URL(`${pathname}?userId=${selectMemberRef.id}`, origin);
    const urlB = new URL(`${pathname}${search}`, origin);

    execRoute({ urlA, urlB, isPush: false, changeTree: true });
  });
}

/**
 * 사용자가 쿼리 변경
 */
export function navigate(query: string, changeTree: boolean = false) {
  const { pathname, search, origin } = window.location;

  const urlA = new URL(`${pathname}${search}`, origin);
  const urlB = new URL(`${pathname}${query}`, origin);

  execRoute({ urlA, urlB, isPush: true, changeTree });
}

/**
 * 공통 라우팅 처리
 */
function execRoute({
  urlA,
  urlB,
  isPush,
  changeTree,
}: {
  urlA: URL;
  urlB: URL;
  isPush: boolean;
  changeTree: boolean;
}) {
  if (urlA.pathname === urlB.pathname) {
    if (!urlB.search || urlA.search === urlB.search) {
      selectMemberRef.id = '';
    } else if (urlA.search !== urlB.search) {
      const userSearchParam = new URLSearchParams(urlB.search);
      const userId = userSearchParam.get('userId');
      if (userId) {
        selectedMemberWithTreeOpen(userId, changeTree);
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
