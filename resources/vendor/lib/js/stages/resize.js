import { emitter, throttle } from '/vendor/lib';


const resize = () => {
    emitter.dispatch('window.resize');
};


window.addEventListener('resize', throttle(resize, 250));
