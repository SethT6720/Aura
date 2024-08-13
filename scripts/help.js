//Func to get an element by id
function get(id) {
    let ele = document.getElementById(id);
    return ele;
}

//Shows which 'page' is currently showing
function pageShowing() {
    let list = document.getElementsByClassName('show');
    if (list.length > 1) console.error('more than one page is showing');
    if (list.length === 1) return list[0];
}

//takes an element and either hides or shows it, or sets it as the current page showing
function hs(ele, whatDo) {
    switch (whatDo) {
        case 'hide':
            ele.classList.add('hide');
            ele.classList.remove('show');
            break;
        case 'show':
            ele.classList.add('show')
            ele.classList.remove('hide')
        case 'switch':
            let ele2 = pageShowing();
            ele.classList.add('show');
            ele.classList.remove('hide');
            ele2.classList.add('hide');
            ele2.classList.remvove('show');
    }
}


//Creates a new element with selected type, text content, appends to given parent, and if a button assigns a function on click
function createEle(type, text, parent, onClick) {
    const ele = document.createElement(type);
    if (text) {
        ele.innerHTML = text;
    }
    parent?.append(ele);
    if (onClick) { 
        ele.addEventListener('click', onClick);
    }
    return ele;
}

function clickEvent(ele, event) {
    ele.addEventListener('click', event);
}

export { get, pageShowing, hs, createEle, clickEvent };
