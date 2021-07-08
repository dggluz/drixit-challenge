const getById = (id: string) => {
    const ret = document.getElementById(id);

    if (ret === null) {
        throw new Error(`There is no element with "${id}" id`);
    }

    return ret;
}

const emailForm = getById('email-form');
const passwordForm = getById('password-form');

emailForm.addEventListener('submit', e => {
    e.preventDefault();
    
    passwordForm.style.display = '';
});

export const foo = null;

console.log('foo');
