const user = /^[a-zа-я]*[a-zа-я]$/mi;
const fhone = /^\+7\(\d{3}\)\d{3}\-\d{4}$/mi;
const email = /(^\w+|^\w+\.\w+|^\w+\-\w+)\@\w+\.\w{2,3}$/mi;
const text = /[^\s].*/mi;
const userPrompt = "имя должно содержать только буквы"
const fhonePrompt = "введите номер в формате +7(000)000-0000"
const emailPrompt = "e-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru"
const textPrompt = "поле не должно быть пустым"

class FormClient {
    constructor() {
        this.formEl = document.userForm;
        this.button = document.userForm.send;
        this._init();
    }

    _init() {
        this.addButtonClickListener((event) => this.send(event))
        this.addFormClickListener((event) => this.focus(event))
    }

    addButtonClickListener(addButtonHandler) {
        this.button.addEventListener('click', addButtonHandler);
    }

    addFormClickListener(addFormHandler) {
        [...this.formEl.elements].forEach(el => {
            el.addEventListener('focus', addFormHandler)
        })
    }

    focus(event) {
        // if ([...event.target.form].some(el => el.classList.contains('--background'))) {
        //     [...event.target.form].forEach(el => {
        //         if (el.name !== 'send') {
        //             el.classList.remove('--background');
        //             el.nextSibling.innerText = "";
        //             el.value = "";
        //         }
        //     })
        // }
        if (event.target.classList.contains('--background')) {
            event.target.classList.remove('--background');
            event.target.nextSibling.innerText = "";
            event.target.value = "";
        }
    }

    send(event) {
        [...event.target.form].forEach(el => {
            if (el.name == 'user') {
                if (!this.inputCheck(el, user)) {
                    this.showError(el, userPrompt);
                    event.preventDefault()
                }
            }
            if (el.name == 'fhone') {
                if (!this.inputCheck(el, fhone)) {
                    this.showError(el, fhonePrompt);
                    event.preventDefault()
                }
            }
            if (el.name == 'email') {
                if (!this.inputCheck(el, email)) {
                    this.showError(el, emailPrompt);
                    event.preventDefault()
                }
            }
            if (el.name == 'text') {
                if (!this.inputCheck(el, text)) {
                    this.showError(el, textPrompt);
                    event.preventDefault()
                }
            }
        })
    }

    inputCheck(text, reg) {
        return reg.test(text.value);
    }

    showError(field, prompt) {
        field.classList.add('--background');
        field.nextSibling.innerText = prompt;
    }
}

let formClient = new FormClient();
