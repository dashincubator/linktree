import { directive, throttle } from '/vendor/lib';


let directives = {
        'mousemove': {
            fn: directive.dispatch
        },
        'stopmousemove': {
            bubble: false
        }
    },
    rootkey = 'root.mousemove';


directive.addEventListener('mousemove', throttle(directive.listener({ directives, rootkey }), 16), {
    capture: true,
    passive: true
});
