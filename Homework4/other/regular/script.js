const reg = /(\')(.+)(\')/gm;
let str = document.querySelector('p').innerText.replace(reg, '"$2"');
document.querySelector('p').innerText = str;