import { $getBySelector } from '../../utils/$get';
import { readHtmlFile } from '../../utils/read-html-file';

const html = readHtmlFile(require('./error-label.component.html'));

export class ErrorLabelComponent {
    private $dom = $(html);

    constructor (message: string) {
        this.bindEvents();
        this.setMessage(message);
    }
    
    appendTo ($wrapper: JQuery<HTMLElement>) {
        $wrapper.append(this.$dom);
        return this;
    }

    remove () {
        this.$getWrapper().addClass('fade');
        setTimeout(() => this.$dom.remove(), 1000);
        return this;
    }

    private $getWrapper() {
        return this.$get('.wrapper');
    }

    private bindEvents () {
        this.$getCloseBtn().on('click', e => {
            this.remove();
        });
    }
    
    private $getCloseBtn() {
        return this.$get('.close');
    }

    private setMessage(message: string) {
        this.$get('.message').text(message);
    }
    
    private $get(selector: string) {
        return $getBySelector (this.$dom) (selector);
    }
}