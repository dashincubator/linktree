import { alert } from '/vendor/components';
import { directive } from '/vendor/lib';


const copy = function(data) {
    let target = this.refs.copy;

    if (!target) {
        return;
    }

    target.select();

    document.execCommand('copy');

    alert.success('Copied to clipboard!', 2);
};


directive.on('copy', copy);
