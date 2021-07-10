import { $getBySelector } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./password-form.component.html'));

export class PasswordFormComponent {
    private $dom = $(html);

    constructor () {
        this.bindEvents();
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
    
            this.$dom.find('input, button[type=submit]').attr('disabled', 'disabled');
            this.$get('.password-form button[type=submit] .active-state').addClass('d-none');
            this.$get('.password-form button[type=submit] .loading-state').removeClass('d-none');
        });
    }
}
