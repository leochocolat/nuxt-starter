import MediaQueriesUtils from '~/assets/javascript/utils/MediaQueriesUtils';
import DeviceUtils from '~/assets/javascript/utils/DeviceUtils';
import Emitter from '~/assets/javascript/events/Emitter';
import ResizeManager from '~/assets/javascript/managers/ResizeManager';

export default ({ store }) => {
    function setup() {
        store.dispatch('device/isMobile', DeviceUtils.isMobile());    
        store.dispatch('device/isTactile', DeviceUtils.isTouch());

        store.dispatch('device/setSize', {
            width: window.innerWidth,
            height: window.innerHeight,
            breakpoint: MediaQueriesUtils.getBreakpoint({ width: window.innerWidth, height: window.innerHeight }),
        });

        setupEventListener();
    }

    function setupEventListener () {
        ResizeManager.addEventListener('resize', resizeHandler);
        ResizeManager.addEventListener('resize:end', resizeEndHandler);
    }

    function resizeHandler(e) {
        Emitter.emit('RESIZE', e);
    }

    function resizeEndHandler(e) {
        Emitter.emit('RESIZE:END', e);

        store.dispatch('device/setSize', {
            width: e.viewportWidth,
            height: e.viewportHeight,
            breakpoint: MediaQueriesUtils.getBreakpoint({ width: e.viewportWidth, height: e.viewportHeight }),
        });
    }

    setup();
}
