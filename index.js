/* Create the website structure */

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const fm = require('front-matter');

const prm = {
    src: "./src/",
    components: "components/",
    content: "content/",
    dist: "./dist/"
}

const htmlFrag = (file, prefix) => {
    let f = fs.readFileSync(prefix + file, 'utf-8');
    f = fm(f);
    fHTML = JSDOM.fragment(f.body)
    return {
        link_: file,
        attributes: f.attributes,
        content: fHTML,
    }
}

let container = fs.readFileSync(prm.src + prm.components + "container.html", 'utf-8');

const header = htmlFrag("header.html", prm.src + prm.components);
const footer = htmlFrag("footer.html", prm.src + prm.components);

let contents = fs.readdirSync(prm.src+prm.content);
contents = contents.map((file) => htmlFrag(file, prm.src + prm.content)).sort((a,b) => a.attributes.level < b.attributes.level ? -1 : 1);

/* const dom = new JSDOM(container); */

// populate menu items
const menuNode = header.content.querySelector("#mainmenu ul");
for (let content of contents) {
    let tempFrag = JSDOM.fragment(`<li><a></a></li>`);
    let a = tempFrag.querySelector("a");
    let link = "./" + content.link_;
    let title = content.attributes.title;
    a.href = link;
    a.textContent = title;
    menuNode.appendChild(tempFrag);
}

for (let content of contents) {
    let dom = new JSDOM(container);
    let wrapperNode = dom.window.document.querySelector("#wrapper");
    let newHead = header.content;
    let newFoot = footer.content;

    for (let child of [
        newHead,
        content.content, 
        newFoot,
    ]) {
        console.log
        wrapperNode.appendChild(child);
    }
    dom.window.document.title = "Renz Torres | " + content.attributes.title;



    fs.writeFileSync(prm.dist + content.link_, dom.window.document.documentElement.outerHTML);
}