import { directive } from '/vendor/lib';


let directives = {
        'click': {
            fn: directive.dispatch
        },
        'stopclick': {
            bubble: false
        }
    },
    rootkey = 'root.click';


directive.addEventListener('click', directive.listener({ directives, rootkey }), {
    capture: true
});
