const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const fm = require('front-matter');

const prm = require('./config.js');

const createHTMLFragment = (file, prefix) => {
    let f = fs.readFileSync(prefix + file, 'utf-8');
    f = fm(f);
    fHTML = JSDOM.fragment(f.body);

    return {
        link_: file,
        attributes: f.attributes,
        content: fHTML,
    }
}

const MenuItems = topLevels => {
    const menuItems = [];
    for (let fragment of topLevels) {
        let link = "./" + fragment.link_;
        let title = fragment.attributes.title;
        let menuItem = JSDOM.fragment(`<li><a href=${link}>${title}</a></li>`);
        menuItems.push(menuItem);
    }
    return menuItems;
}

// file = file path to document fragment
const createHTMLFile = (allContents, content) => {
    const container = fs.readFileSync(prm.parameters.src + prm.parameters.components + "container.html", 'utf-8');
    const header = createHTMLFragment("header.html", prm.parameters.src + prm.parameters.components);

    const menu = header.content.querySelector("#mainmenu ul");
    for (let item of MenuItems(allContents)) {
        menu.appendChild(item);
    }
    
    const footer = createHTMLFragment("footer.html", prm.parameters.src + prm.parameters.components);

    const dom = new JSDOM(container);
    const wrapperNode = dom.window.document.querySelector("#wrapper");
    for (let child of [header, content, footer]) {
        wrapperNode.appendChild(child.content);
    }
    dom.window.document.title = prm.parameters.titlePrefix + content.attributes.title;

    return {
        name: content.link_,
        outputFilePath: prm.parameters.dist + content.link_,
        html: dom.window.document.documentElement.outerHTML,
    }}

const addTOC = (file) => {
    const dom = new JSDOM(file.html);

    const contents = dom.window.document.querySelectorAll("article > section:not(#toc)");
    const table = dom.window.document.querySelector("#toc > ul");

    for (let content of contents) {
        let contentHeader = content.querySelector("h2");
        if (contentHeader !== null) {
            let name_ = contentHeader.textContent;
            let id = content.id;

            const frag = JSDOM.fragment(`<li><a href=#${id}>${name_}</a></li>`);

            table.appendChild(frag);
        }

        const returnFrag = JSDOM.fragment(`<div class="prominent toc-return"><a href="#toc">Return to top</a></div>`);
        content.appendChild(returnFrag);
    }

    return {
        name: file.name,
        outputFilePath: file.outputFilePath,
        html: dom.window.document.documentElement.outerHTML,
    }

}

const main = () => {
    const contents = fs.readdirSync(prm.parameters.src+prm.parameters.content).filter(file => file.includes(".html")).map(file => createHTMLFragment(file, prm.parameters.src + prm.parameters.content)).sort((a,b) => a.attributes.level < b.attributes.level ? -1 : 1);
    const files = contents.map(content => createHTMLFile(contents, content));

    for (let file of files) {
        if (file.name == "cv.html" | file.name == "projects.html") {
            file = addTOC(file)
        }
        fs.writeFileSync(file.outputFilePath, file.html);
    }


}

main();