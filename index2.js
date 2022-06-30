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
		`<main><article class="single">${parsed.body}</article></main>`
	);
	return parsed;
}

// from an article page, returns a full femDom object with body = JSDOM object
const simpleArticle = (femDom) => {
	const container = components.container();
	const wrapperNode = container.window.document.querySelector("#wrapper");
	const header = components.header();
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
const carouselArticle = (label, desc, level = 0) => {
	const container = components.container();
	const wrapperNode = container.window.document.querySelector("#wrapper");
	const header = components.header();
	const footer = components.footer();

	const article = components.carousel();
	article.querySelector("h1").textContent = label;

	for (let sec of [header, article, footer]) {
		wrapperNode.append(sec);
	}

	container.window.document.title = param.titlePrefix + label

	return {
		attributes: {
			title: label,
			id: label.toLowerCase(),
			description: desc,
			level,
		}
	}
}

function writeFemDom(femdom, prefix) {
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
	
	// create projects page
	const projects = carouselArticle("Projects", "A summary of my major projects", 0);
	
}

const femDom = MDtoFemDom(fs.readFileSync("src/content/index.md", "utf-8"))
console.log(femDom)

// main();