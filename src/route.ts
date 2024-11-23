import { selectMemberRef, initSelect } from '@/store';

export function makeRoute() {
  initSelect();

  window.addEventListener('popstate', _ => {
    const { pathname, search, origin } = window.location;

    const urlA = new URL(`${pathname}?userId=${selectMemberRef.id}`, origin);
    const urlB = new URL(`${pathname}${search}`, origin);

    execRoute(urlA, urlB, false);
  });
}

export function navigate(query: string) {
  const { pathname, search, origin } = window.location;

  const urlA = new URL(`${pathname}${search}`, origin);
  const urlB = new URL(`${pathname}${query}`, origin);

  execRoute(urlA, urlB, true);
}

function execRoute(urlA: URL, urlB: URL, isPush?: boolean) {
  if (urlA.pathname === urlB.pathname) {
    if (!urlB.search || urlA.search === urlB.search) {
      selectMemberRef.id = '';
    } else if (urlA.search !== urlB.search) {
      const userSearchParam = new URLSearchParams(urlB.search);
      const userId = userSearchParam.get('userId');
      if (userId) {
        selectMemberRef.id = userId;
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
