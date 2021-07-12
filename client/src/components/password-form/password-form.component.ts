import { str } from '../../type-validation/str';
import { $getBySelector } from '../../utils/$get';
import { Observable } from '../../utils/observable';
import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./password-form.component.html'));

export class PasswordFormComponent extends Observable<{
    submit: string;
}> {
    private $dom = $(html);

    constructor () {
        super();
        this.bindEvents();
    }

    getPassword() {
        return str(this.$getPassword().val());
    }

    appendTo ($wrapper: JQuery<HTMLElement>) {
        $wrapper.append(this.$dom);
        return this;
    }

    focus () {
        this.$getPassword().trigger('focus');
        return this;
    }

    setEditableState () {
        this.$dom.find('input, button[type=submit]').removeAttr('disabled');
        this.$get('.password-form button[type=submit] .active-state').removeClass('d-none');
        this.$get('.password-form button[type=submit] .loading-state').addClass('d-none');

        return this;
    }

    private $getPassword() {
        return this.$get('#password');
    }

    private $get (selector: string) {
        return $getBySelector (this.$dom) (selector);
    }

    private bindEvents () {
        this.$get('form').on('submit', e => {
            e.preventDefault();
    
            this.setLoadingState();
            this._notifyObservers('submit', this.getPassword());
        });

        return this;
    }

    private setLoadingState() {
        this.$dom.find('input, button[type=submit]').attr('disabled', 'disabled');
        this.$get('.password-form button[type=submit] .active-state').addClass('d-none');
        this.$get('.password-form button[type=submit] .loading-state').removeClass('d-none');

        return this;
    }
}
