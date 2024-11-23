import { h, render, mount } from '@/engine';
import Organ from '@/pages/organ';
import '@/input.css';

// https://github.com/themesberg/flowbite-admin-dashboard

const Root = mount(() => {
  return () => (
    <div class="w-4/5 max-w-xl h-[80vh] flex flex-col text-white">
      <Organ />
    </div>
  );
});

render(<Root />, document.body);
