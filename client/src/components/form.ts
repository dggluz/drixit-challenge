const html = require('./form.html').default;

const getById = (id: string) => {
    const ret = document.getElementById(id);

    if (ret === null) {
        throw new Error(`There is no element with "${id}" id`);
    }

    return ret;
}


export class FormComponent {
    $dom: JQuery<HTMLElement>;
    constructor () {
        this.$dom = $(html).appendTo('#app');
    }
}

new FormComponent();

const emailForm = getById('email-form');
const passwordForm = getById('password-form');

emailForm.addEventListener('submit', e => {
    e.preventDefault();
    
    passwordForm.style.display = '';
});