import { alert } from '/vendor/components';
import { directive, dom, node } from '/vendor/lib';


let i = Date.now();


function handle(refs, tag) {
    if (!tag) {
        return;
    }

    dom.read(() => {
        let container = refs.field.container,
            template = refs.field.template.innerHTML,
            value = tag.value;

        if (!container || !template) {
            return;
        }

        if (!value) {
            alert.error('Invalid value, try again!', 2);
            return;
        }

        dom.update(() => {
            node.html(container, {
                append: template.replace(new RegExp('{value}', 'g'), value).replace(new RegExp('{random}', 'g'), ++i)
            });

            tag.value = '';
        });
    });
}


const button = function() {
    handle(this.refs, this.refs.field.tag);
};

const tag = function(e) {
    // Enter Key: 13
    if (e.keyCode !== 13) {
        return;
    }

    e.preventDefault();

    handle(this.refs, this.element);
};


directive.on('field.tag', tag);
directive.on('field.tag.button', button);
