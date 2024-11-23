import { h, render, mount } from '@/engine';
import Organ from '@/pages/organ';
import '@/input.css';

// https://github.com/themesberg/flowbite-admin-dashboard

const Root = mount(() => {
  return () => (
    <div class="w-3/4 h-[80vh] flex flex-col">
      <Organ />
    </div>
  );
});

render(<Root />, document.body);
