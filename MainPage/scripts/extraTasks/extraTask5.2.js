function createList(list, size, title) {
    if (list === null) {
        return `<li style="font-size:${size.toString()}pt">${title}</li>`;
    }
    return (title !== undefined ? `<li style="font-size:${size.toString()}pt">${title}</li>` : '')
        + list.map((node) => ` <ul>${createList(node.children, size * 0.9, node.value)}</ul>`).join('\n');
}

/*-----------------------------------------------------------------------------------------*/

const element = document.getElementById('body-id');
list = [
    {
        value: 'Пункт 1.',
        children: null,
    },
    {
        value: 'Пункт 2.',
        children: [
            {
                value: 'Подпункт 2.1.',
                children: null,
            },
            {
                value: 'Подпункт 2.2.',
                children: [
                    {
                        value: 'Подпункт 2.2.1.',
                        children: null,
                    },
                    {
                        value: 'Подпункт 2.2.2.',
                        children: null,
                    },
                ],
            },
            {
                value: 'Подпункт 2.3.',
                children: null,
            },
        ],
    },
    {
        value: 'Пункт 3.',
        children: null,
    },
];

element.innerHTML = createList(list, 14, 'List');
