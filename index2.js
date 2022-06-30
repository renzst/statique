/* 
Website generator for renzst.com
Generates HTML from template container, header, and footer files

Structure should look as following:
  /src/components:
    container (includes HTML head information and responsive wrapper)
    header, with #mainmenu > ul to which to add topLevels
    footer, static
  /
*/

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const fm = require('front-matter');
const {marked} = require('marked');
const prm = require('./config.js');