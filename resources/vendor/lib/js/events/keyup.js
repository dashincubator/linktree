import { directive } from '/vendor/lib';


let directives = {
        'keyup': {
            fn: directive.dispatch
        }
    },
    rootkey = 'root.keyup';


directive.addEventListener('keyup', directive.listener({ directives, rootkey }), {
    capture: true
});
