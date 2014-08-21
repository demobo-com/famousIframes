define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Scrollview = require('demobo/Scrollview');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform   = require("famous/core/Transform");

    var mainContext = Engine.createContext();

    var surfaces = [];
    var scrollview = new Scrollview({
        margin: 1000
    });

    Engine.pipe(scrollview);
    scrollview.sequenceFrom(surfaces);

    for (var i = 0; i < 40; i++) {
        var surface = new Surface({
            size: [100, 100],
            content: 'Surface ' + i,
            properties: {
                textAlign: 'center',
                lineHeight: '100px',
                color: 'white',
                backgroundColor: "hsl(" + (i * 360 / 20) + ", 100%, 50%)",
                zIndex: i,
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                webkitBackfaceVisibility: 'visible'
            }
        });

        surfaces.push(surface);
    }

    var centerModifier = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    mainContext.add(centerModifier).add(scrollview);
//    mainContext.setPerspective(1000);

    scrollview.outputFrom(function(offset) {
        return Transform.moveThen([0, offset/2, 300],
            Transform.rotateY(0.005 * offset));
    });

});
