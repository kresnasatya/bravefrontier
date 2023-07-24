export default function (params) {
    const title = (params.title) ?? 'Brave Frontier Wiki (Unofficial)';
    const description = (params.description) ?? 'Brave Frontier wiki (Unofficial) for omni units and dual brave burst';
    const image = (params.image) ?? '';
    const url = (params.url) ?? window.location.href;
    document.querySelector('meta[name="title"]').setAttribute('content', title);
    document.querySelector('meta[name="description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', image);
    document.querySelector('meta[property="og:url"]').setAttribute('content', url);
}