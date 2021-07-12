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
        return str(this.$get('#password').val());
    }

    appendTo ($wrapper: JQuery<HTMLElement>) {
        $wrapper.append(this.$dom);
        return this;
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
    }

    private setLoadingState() {
        this.$dom.find('input, button[type=submit]').attr('disabled', 'disabled');
        this.$get('.password-form button[type=submit] .active-state').addClass('d-none');
        this.$get('.password-form button[type=submit] .loading-state').removeClass('d-none');
    }
}
