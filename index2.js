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
const {walk} = require('./walk.js');

const components = (() => {
	const filePref = param.components;
	// if dir does not contain container, footer, header, return error

	const comps = {};

	for (let f of ["header", "footer", "carousel"]) {
		comps[f] = () => JSDOM.fragment(fs.readFileSync(filePref + f + ".html", "utf-8"));
	}

	comps["container"] = () => new JSDOM(fs.readFileSync(filePref + "container.html", "utf-8"));

	return comps;
})();

// returns as front-matter object with .body as JSDOM
// with FM attributes separate from body
// FM-JSDOM = femDom object
function MDtoFemDom(data) {
	const parsed = fm(data);
	parsed.body = marked.parse(parsed.body);
	parsed.body = JSDOM.fragment(
		`<main><article class="single card">${parsed.body}</article></main>`
	);
	return parsed;
}

const menuItems = () => {
	const mds = fs.readdirSync(param.src).filter(x => x.endsWith(".md"))
	let parseds = mds.map(x => fm(fs.readFileSync(param.src + x, "utf-8")));
	parseds = parseds.filter(x => x.attributes.level <= 0).sort((a,b) => a.attributes.level < b.attributes.level ? -1 : 1);
	const menuItems = parseds.map(x => {
		return JSDOM.fragment(
			`
			<li><a href=${x.attributes.id + ".html"}>${x.attributes.title}</a></li>
			`
		)
	});
	// manual add for now
	menuItems.push(JSDOM.fragment(
		`
		<li><a href=projects.html">Projects</a></li>
		`
	))

	return menuItems

};

// from an article page, returns a full femDom object with body = JSDOM object
const simpleArticle = (femDom) => {
	const container = components.container();
	const wrapperNode = container.window.document.querySelector("#wrapper");
	const header = components.header();
	const menu = header.querySelector("#mainmenu > ul");
	const mItems = menuItems();
	console.log(mItems);
	for (let item of mItems) {
		menu.appendChild(item);
	}

	const footer = components.footer();

	const article = femDom.body;

	for (let sec of [header, article, footer]) {
		wrapperNode.appendChild(sec);
	};

	container.window.document.title = param.titlePrefix + femDom.attributes.title;

	femDom.body = container;

	return femDom;
}

// creates a new carousel using a label (need to create with characteristic of a femdom)
const carouselArticle = (carouselParams) => {
	const container = components.container();
	const wrapperNode = container.window.document.querySelector("#wrapper");
	const header = components.header();
	const menu = header.querySelector("#mainmenu > ul");
	const mItems = menuItems();
	for (let item of mItems) {
		menu.appendChild(item);
	}
	const footer = components.footer();

	const article = components.carousel();
	article.querySelector("h1").textContent = carouselParams.label;

	for (let sec of [header, article, footer]) {
		wrapperNode.append(sec);
	}

	container.window.document.title = param.titlePrefix + carouselParams.label

	return {
		attributes: {
			title: carouselParams.label,
			id: carouselParams.id,
			description: carouselParams.desc,
			level: carouselParams.level,
		},
		body: container,
		carousel: {
			dir: carouselParams.dir,
		}
	}
}

function populateCarousel(femDom) {
	const dir = param.src + femDom.carousel.dir;
	const sources = fs.readdirSync(dir);
	const fms = sources.map(x => fm(fs.readFileSync(dir+x, "utf-8"))["attributes"]);

	const carouselNode = femDom.body.window.document.querySelector("article");

	for (let fm of fms) {
		let frag = JSDOM.fragment(
		`
		<section id="${fm.id}" class="card horse collapsible collapsed">
			<h2>${fm.title}</h2>
			<p>${fm.description}</p>
			<a class="prominent" href=${femDom.carousel.dir + fm.id + ".html"}>Read more</a>
		</section>
		`
		)
		carouselNode.appendChild(frag);
	}
}

function writeFemDom(femdom, prefix = "") {
	if (!fs.existsSync(param.dist + prefix)) {
		let tempDist = param.dist + prefix;
		console.log(`Creating ${tempDist}...`);
		fs.mkdirSync(tempDist);
	}
	let fileName = param.dist + prefix + femdom.attributes.id + ".html";

	let html = femdom.body.serialize();

	console.log(`Writing ${fileName}...`);
	fs.writeFileSync(fileName, html);

}

const prefixFile = (str) => {
	str = str.replace(param.src, "");
	let prefix = str.match("^.*\/");
	prefix = prefix === null ? "" : prefix[0];
	let file = str.replace(prefix, "");

	return {file, prefix};
}



const main = () => {
	// create static components
	let dirContents = walk(param.src).filter(x => x.endsWith(".md"));
	const files = dirContents.map(x => prefixFile(x));

	for (let file of files) {
		const data = fs.readFileSync(param.src + file.prefix + file.file, "utf-8");
		const femDom = MDtoFemDom(data);
	
		const article = simpleArticle(femDom);
		writeFemDom(article, file.prefix);
	}
	
	// create carousels
	for (let c in param.carousels) {
		let cParams = param.carousels[c];;
		const carousel = carouselArticle(cParams);
		populateCarousel(carousel);
		writeFemDom(carousel);
	}
}

main();