"use strict";

const $contentList = document.querySelector('.root > .content > .list');
const $modal = document.getElementById('modal');
const $closeMod = document.getElementById('close_modal');

function openModal() {
    $modal.style.display = "flex";
    $modal.querySelector('input[name="title"]').value = note?.title;
}

function closeModal() {
    $modal.style.display = "none";
}

$closeMod.addEventListener('click', e => {
    e.preventDefault();

    closeModal();
}, false);

let note = [];

function getNote(defaultState = {}) {
    try {
        const data = localStorage.getItem('note');

        if (!data) {
            note = defaultState;
        } else {
            note = JSON.parse(data);
        }
    } catch (e) {
        note = defaultState;
        console.log(e);
    }
}

getNote(// test data
    {
        title: 'Test',
        todos: [{
            text: 'Home task...',
            check: false
        }],
        date: new Date()
    }
);
renderNote();

document.getElementById('inp').onkeyup = function inpt() {
    let b = document.getElementById('inp').value;
    localStorage.setItem('input', b);
}
document.getElementById('inp').value = localStorage.getItem('input');

document.getElementById('form-update').addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = [...e.currentTarget.getElementsByTagName('input')];
    const values = [...inputs].reduce((acc, { value, name }) => {
        acc[name] = value;

        return acc;
    }, {});

    if (!values.title || !values.text) {
        return;
    }

    Object.assign(note, {
        title: values.title,
        date: new Date()
    })

    note?.todos.push({
        text: values.text,
        check: false,
    });

    saveNote();

    inputs.forEach((input) => input.value = '');
    closeModal();
}, false);

function saveNote() {
    if (saveNote.timeoutId) {
        clearTimeout(saveNote.timeoutId);
    }

    saveNote.timeoutId = setTimeout(() => {
        localStorage.setItem('note', JSON.stringify(note));
        renderNote();
    }, 50);
}

function renderNote() {
    if (renderNote.timeoutId) {
        clearTimeout(renderNote.timeoutId);
    }

    renderNote.timeoutId = setTimeout(() => {
        const nodes = [];

        note?.todos.forEach((item, id) => {
            const box = document.createElement('label');

            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');

            const span = document.createElement('span');
            span.innerText = item.text;

            if (item.check) {
                span.classList.add('underlined');
                input.checked = true;
            }

            box.append(input);
            box.append(span);

            input.addEventListener('change', (e) => {
                e.preventDefault();

                item.check = !item.check;
                saveNote();
            }, false);

            const button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.addEventListener('click', () => {
                note?.todos.splice(id, 1);
                saveNote();
            }, false);
            button.innerText = 'delete';

            box.append(button);
            nodes.push(box);
        });

        const item = document.createElement('div');

        item.classList.add('item');

        const header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = `<span class="title">${note?.title}</span>`;

        const edit = document.createElement('button');
        edit.setAttribute('type', 'button');
        edit.classList.add('edit');
        edit.innerText = 'Edit';

        edit.addEventListener('click', e => {
            e.preventDefault();

            openModal();
        }, false);

        header.append(edit);
        item.append(header);
        item.append(...nodes);

        $contentList.querySelectorAll('.item').forEach((item) => item.remove());
        $contentList.insertBefore(item, $contentList.querySelector('.add'));
    }, 0);
}

document.getElementById('clear').onclick = function () {
    localStorage.clear();
    window.location.reload();
}
