export function makeRoute() {
  window.addEventListener('popstate', _ => {
    const { pathname, search } = window.location;

    routeRef.page = `${pathname}${search}`;
  });

  return routeRef;
}

export function navigate(userId: string) {
  history.pushState(null, '', '?ss=33');
}
