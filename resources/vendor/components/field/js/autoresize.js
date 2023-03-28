import { directive, dom, node } from '/vendor/lib';


const autoresize = function() {
    let tag = this.element;

    dom.read(() => {
        let offsetHeight = tag.offsetHeight,
            scrollHeight = tag.scrollHeight;

        if (offsetHeight > scrollHeight) {
            return;
        }

        dom.update(() => {
            node.style(tag, { height: `${scrollHeight}px` });
        });
    });
};


directive.on('field.autoresize', autoresize);
