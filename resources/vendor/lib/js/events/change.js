import { directive } from '/vendor/lib';


let directives = {
        'change': {
            fn: directive.dispatch
        },
        'stopchange': {
            bubble: false
        }
    },
    rootkey = 'root.change';


directive.addEventListener('change', directive.listener({ directives, rootkey }), {
    capture: true
});
