import { overlay } from '/vendor/components';
import { emitter } from '/vendor/lib';


let container = {
        modifier: (k) => `modals--${k}`,
        ref: 'modals.container'
    },
    directives = {
        close: 'modals',
        trigger: 'modal'
    };


const mount = () => {
    overlay(container, directives);
};


emitter.on('components.mount', mount);
