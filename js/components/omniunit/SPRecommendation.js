export default function (spRecommendation) {
  const $section = document.createElement('section');
  $section.setAttribute('class', 'w-full');
  const parentFragment = document.createDocumentFragment();
  for (const sp of spRecommendation) {
    const fragment = document.createDocumentFragment();
    const $ul = document.createElement('ul');
    for (const item of sp.list) {
      fragment.appendChild(document.createRange().createContextualFragment(
        `<li class="flex justify-between items-center my-4 py-4 border-b">
          <span class="w-9/12 inline-block">${item.option}</span><span class="border rounded-full border-yellow-600 bg-blue-600 text-white content-center text-center w-10 h-10">${item.cost}</span>
        </li>`
      ));
    }
    $ul.appendChild(fragment);
    parentFragment.appendChild(document.createRange().createContextualFragment(`
    <div class="my-8">
      <div class="flex justify-between items-center my-4 py-4">
      <h3 class="text-xl"><strong>${sp.title}</strong></h2>
      <span class="border rounded-full border-yellow-600 bg-blue-600 text-white content-center text-center w-10 h-10">${sp.total}</span>
      </div>
      ${sp.hasOwnProperty('analysis') 
        ? `<h3 class="mt-4 text-lg leading-loose"><strong>Analysis</strong></h3>
        <p class="mt-4 leading-loose italic">${sp.analysis}</p>` 
        : ''}
      ${$ul.outerHTML}
    </div>
  `));
  }
  $section.appendChild(parentFragment);
  return $section.outerHTML;
}