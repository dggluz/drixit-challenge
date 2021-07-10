import { $getBySelector } from '../../utils/$get';
import { Observable } from '../../utils/observable';
import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./email-form.component.html'));

export class EmailFormComponent extends Observable<{
    'set-editable': void;
    'set-not-editable': void;
}> {
    private $dom = $(html);

    constructor () {
        super();
        this.$get('form').on('submit', e => {
            e.preventDefault();

            this.setNotEditableState();
        });

        this.$get('.edit button').on('click', e => {
            e.preventDefault();

            this.setEditableState();
        });
    }

    appendTo($wrapper: JQuery<HTMLElement>) {
        $wrapper.append(this.$dom);
        return this;
    }

    private setNotEditableState () {
        this.$get('input').attr('disabled', 'disabled');
        this.$get('.edit').removeClass('d-none');
        this.$get('button[type=submit]').addClass('d-none');

        this._notifyObservers('set-not-editable', undefined);

        return this;
    }

    private setEditableState () {
        this.$get('input').removeAttr('disabled');
        this.$get('.edit').addClass('d-none');
        this.$get('button[type=submit]').removeClass('d-none');

        this._notifyObservers('set-editable', undefined);

        return this;
    }

    private $get (selector: string) {
        return $getBySelector (this.$dom) (selector);
    }
}
