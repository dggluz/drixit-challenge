import { str } from '../../type-validation/str';
import { $getBySelector } from '../../utils/$get';
import { Observable } from '../../utils/observable';
import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./email-form.component.html'));
// Include styles
require('./email-form.component.less');

export class EmailFormComponent extends Observable<{
    'set-editable': string;
    'set-not-editable': void;
}> {
    private $dom = $(html);

    constructor () {
        super();

        this.bindEvents();
    }

    getEmail () {
        return str(this.$getEmail().val());
    }

    appendTo($wrapper: JQuery<HTMLElement>) {
        $wrapper.append(this.$dom);
        return this;
    }

    focus () {
        setTimeout(() => this.$getEmail().trigger('focus'), 50);
        return this;
    }

    disable () {
        this.setNotEditableState();
        this.$getEdit().attr('disabled', 'disabled');
        return this;
    }

    enable () {
        this.$getEdit().removeAttr('disabled');
        return this;
    }

    private $getEmail() {
        return this.$get('#email');
    }

    private bindEvents () {
        this.$get('form').on('submit', e => {
            e.preventDefault();

            this.setNotEditableState();
        });

        this.$getEdit().on('click', e => {
            e.preventDefault();

            this.setEditableState();
        });
    }

    private $getEdit() {
        return this.$get('.edit button');
    }

    private setNotEditableState () {
        this.$get('.input-wrapper').addClass('input-group')
        this.$getEmail().attr('disabled', 'disabled');
        this.$get('.edit').removeClass('d-none');
        this.$getNext().addClass('d-none');

        this._notifyObservers('set-not-editable', undefined);

        return this;
    }

    private setEditableState () {
        this.$get('.input-wrapper').removeClass('input-group')
        this.$getEmail().removeAttr('disabled');
        this.$get('.edit').addClass('d-none');
        this.$getNext().removeClass('d-none');

        this.focus();

        this._notifyObservers('set-editable', this.getEmail());

        return this;
    }

    private $getNext() {
        return this.$get('button[type=submit]');
    }

    private $get (selector: string) {
        return $getBySelector (this.$dom) (selector);
    }
}
