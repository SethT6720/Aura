function get(id) {
    let ele = document.getElementById(id);
    return ele;
}

function pageShowing() {
    let list = document.getElementsByClassName('show');
    if (list.length > 1) console.error('more than one page is showing');
    if (list.length === 1) return list[0];
}

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

function createEle(type, text, parent, onClick) {
    const ele = document.createElement(type);
    if (text) ele.innerHTML = text;
    parent?.append(ele);
    if (onClick) ele.onClick = onClick;
    return ele;
}

export { get, pageShowing, hs, createEle };
