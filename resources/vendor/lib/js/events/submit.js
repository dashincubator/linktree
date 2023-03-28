import { directive } from '/vendor/lib';


let directives = {
        'stopsubmit': {
            bubble: false
        },
        'submit': {
            fn: directive.dispatch
        }
    },
    rootkey = 'root.submit';


directive.addEventListener('submit', directive.listener({ directives, rootkey }), {
    capture: true
});
