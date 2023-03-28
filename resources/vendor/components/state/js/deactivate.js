import { state } from '/vendor/components';
import { directive, dom } from '/vendor/lib';


const deactivate = function() {
    dom.update(() => {
        state.deactivate( this.refs.deactivate || this.element );
    });
};


directive.on('deactivate', deactivate);
