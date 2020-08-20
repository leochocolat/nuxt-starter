const handlers = {
    'setup': setup,
    'close': close,
};

if (typeof self === 'object') {
    onmessage = function(e) {
        const name = e.data.name;
        const fn = handlers[name];
        
        if (!fn) {
            throw new Error('no handler for type: ' + e.data.type);
        } else {
            fn(e.data);
        }
    };
}

function setup(e) {
        
}

function close() {
    
}