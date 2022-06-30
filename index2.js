/* 
Website generator for renzst.com
Generates HTML from template container, header, and footer files

Structure should look as following:
  /src/components:
    container (includes HTML head information and responsive wrapper)
    header, with #mainmenu > ul to which to add topLevels
    footer, static
  /src/content:
    contains all your md's
    all media, css, and static files should go in dist. currently no good way to match these up
*/

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const fm = require('front-matter');
const {marked} = require('marked');
const {param} = require('./param.js');

const components = (() => {
	const filePref = param.components;
	// if dir does not contain container, footer, header, return error

	let container = fs.readFileSync(filePref + "container.html", "utf-8");
	container = new JSDOM(container);

	const comps = {};

	for (let f of ["header.html", "footer.html", "carousel.html"]) {
		comps[f] = JSDOM.fragment(fs.readFileSync(filePref + f, "utf-8"));
	}

	comps[container] = container;

	return comps;
})();

// JSDOM Fragment to JSDOM Fragment
const fragmentCopy = (fragment) => {
	let f = fragment.outerHTML;
	f = JSDOM.fragment(f);

	return f;
}

// returns as front-matter object with .body as JSDOM
// with FM attributes separate from body
// FM-JSDOM = femDom object
function MDtoFemDom(data) {
	const parsed = fm(data);
	parsed.body = marked.parse(parsed.body);
	parsed.body = JSDOM.fragment(
		`<main><article class="single">${parsed.body}</article></main>`
	);
	return parsed;
}

// from an article page, returns a full femDom object with body = JSDOM object
const simpleArticle = (femDom) => {
	const container = components.container;
	const wrapperNode = container.window.document.querySelector("#wrapper");
	const header = fragmentCopy(components.header);
	const footer = fragmentCopy(components.footer);

	const article = femDom.body;

	for (let sec of [header, article, footer]) {
		wrapperNode.appendChild(sec);
	};

	femDom.body = container;

	return femDom;
}

function writeFemDom(femdom) {
	let fileName = femdom.attributes.id + ".html";
	let html = femdom.body.outerHTML;

	fs.writeFileSync(fileName, html);

}

const main = () => {
	file = "index.md";
	const data = fs.readFileSync(param.src + file, "utf-8");
	let index = MDtoFemDom(data);

	let article = simpleArticle(index);

	writeFemDom(article);
}

main();