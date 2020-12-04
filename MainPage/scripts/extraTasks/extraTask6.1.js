function rollUp(event) {
    if (event.target.closest('li')) {
        for (const el of event.target.parentElement.querySelectorAll('ul')) {
            if (el.style.display !== 'none') {
                el.style.display = 'none';
            } else {
                el.style.removeProperty('display');
            }
        }
    } else {
        event.stopPropagation();
    }
}

/*-----------------------------------------------------------------------------------------*/

const lst = document.getElementById('body-id');
lst.addEventListener('click', rollUp);
