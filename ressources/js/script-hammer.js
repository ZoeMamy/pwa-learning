/**
 * Script for pan
 */
console.debug('loading hammer-panel')
var myElement = document.getElementById('hammer-panel');

// create a simple instance
// by default, it only adds horizontal recognizers
console.debug('initializing hammer element', myElement)
var mc = new Hammer(myElement);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element


console.debug('hammer', 'set option for ', 'pan')
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
console.debug('hammer', 'listen to events for ', 'pan')
mc.on("panleft panright panup pandown tap press", function(ev) {
    let msg = ev.type +" gesture detected.";
    myElement.textContent = msg
    console.debug('Hammer event', 'Pan', msg)
});