import { state } from '/vendor/components';
import { directive, dom } from '/vendor/lib';


const activate = function() {
    dom.update(() => {
        state.activate( this.refs.activate || this.element );
    });
};


directive.on('activate', activate);
