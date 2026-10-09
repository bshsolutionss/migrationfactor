
export function breadcrumb(name,desc=''){return `<section class="page-hero"><div class="container"><p class="breadcrumb"><a href="/">Home</a><span>/</span>${name}</p><h1 class="split">${name}</h1>${desc?`<p>${desc}</p>`:''}</div></section>`}
