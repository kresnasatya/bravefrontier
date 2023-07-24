import setOgMeta from "../utils/setOgMeta.js";
import setActiveMenu from "../utils/setActiveMenu.js";

export default function (ctx) {
  if (document.body.classList.contains('bg-gray-300')) {
    document.body.classList.remove('bg-gray-300');
    document.body.classList.add('bg-white');
  }
  setActiveMenu(ctx.path);
  document.title = ctx.title = `Brave Frontier Wiki (Unofficial)`;
  setOgMeta({
    title: 'Brave Frontier Wiki (Unofficial)',
    description: `Brave Frontier wiki (Unofficial) for omni units and dual brave burst`,
    url: `${window.location.host}${ctx.path}`
  });
  import('../components/Home.js').then(module => {
    document.querySelector('main').textContent = '';
    document.querySelector('main').appendChild(module.default());
  });
}