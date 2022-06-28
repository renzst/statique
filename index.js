/* Create the website structure */

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');

const prm = {
    src: "./src/",
    components: "components/",
    content: "content/",
    dist: "./dist/"
}

const container = fs.readFileSync(prm.src + prm.components + "container.html", 'utf-8');
const header = fs.readFileSync(prm.src + prm.components + "header.html", 'utf-8');
const footer = fs.readFileSync(prm.src + prm.components + "footer.html", 'utf-8');

const index = fs.readFileSync(prm.src + prm.content + "index.html", 'utf-8');

const dom = new JSDOM(container);
const headerHTML = JSDOM.fragment(header);
const footerHTML = JSDOM.fragment(footer);
const indexHTML = JSDOM.fragment(index);

const wrapperNode = dom.window.document.querySelector("#wrapper");

for (let node of [headerHTML, indexHTML, footerHTML]) {
    wrapperNode.appendChild(node);
}

console.log(dom.window.document.title);

fs.writeFileSync("./dist/"+"index.html", dom.window.document.documentElement.outerHTML);