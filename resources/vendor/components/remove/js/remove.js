import { directive, dom, node } from '/vendor/lib';


const remove = function() {
    dom.update(() => {
        node.html(this.refs.remove || this.element, { remove: true });
    });
};


directive.on('remove', remove);
