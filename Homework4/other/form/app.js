class FormClient {
    constructor() {
        this.patterns = {
            user: /^[a-zа-я]+$/mi,
            fhone: /^\+7\(\d{3}\)\d{3}\-\d{4}$/mi,
            email: /(^\w+|^\w+\.\w+|^\w+\-\w+)\@\w+\.[a-z]{2,3}$/mi,
            text: /[^\s].*/mi,
        };
        this.errors = {
            user: "имя должно содержать только буквы",
            fhone: "введите номер в формате +7(000)000-0000",
            email: "e-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru",
            text: "поле не должно быть пустым"
        };
        this._init();
    }

    _init() {
        this._addButtonClickListener(event => this.send(event));
        this._addFormClickListener(event => this.focus(event));
    }

    _addButtonClickListener(addButtonHandler) {
        document.userForm.send.addEventListener('click', addButtonHandler);
    }

    _addFormClickListener(addFormHandler) {
        [...document.userForm.elements].forEach(el => {
            el.addEventListener('focus', addFormHandler);
        })
    }

    focus(event) {
        if (event.target.classList.contains('--background')) {
            event.target.classList.remove('--background');
            event.target.nextSibling.innerText = "";
            event.target.value = "";
        }
    }

    send(event) {
        [...event.target.form].forEach(field => {
            if (field.name !== 'send') {
                if (!this.inputCheck(field.value, this.patterns[field.name])) {
                    this.showError(field, this.errors[field.name]);
                    event.preventDefault();
                }
            }
        })
    }

    inputCheck(text, reg) {
        return reg.test(text);
    }

    showError(field, error) {
        field.classList.add('--background');
        field.nextSibling.innerText = error;
    }
}

let formClient = new FormClient();


// При фокусе на любое поле отчищает сразу все поля

// if ([...event.target.form].some(el => el.classList.contains('--background'))) {
//     [...event.target.form].forEach(el => {
//         if (el.name !== 'send') {
//             el.classList.remove('--background');
//             el.nextSibling.innerText = "";
//             el.value = "";
//         }
//     })
// }