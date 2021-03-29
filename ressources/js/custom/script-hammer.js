/**
 * Script for pan
 */
console.debug('loading hammer-panel-1')
var myElement = document.getElementById('hammer-panel-1');
var msgElement = document.getElementById('swipe-msg-pan');

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
mc.on("panleft panright panup pandown", function (ev) {
    let msg = ev.type + " detected.";
    msgElement.textContent = msg
    console.debug('Hammer event', 'Pan', msg)
});



// /**
//  * Script for swipe
//  */

console.debug('loading hammer-panel-2')
var myElement2 = document.getElementById('hammer-panel-2');
var msgElement2 = document.getElementById('swipe-msg-swipe');
Hammer(myElement2).on('swiperight swipeleft', function (ev) {
    //   animate blok
    let option = {}
    if (ev.type === 'swiperight') {
        option = { 'margin-left': '30vw' }
    } else {
        option = { 'margin-left': '-30vw' }
    }
    $('#label-swipe').animate(option, 1000);
    let msg = ev.type + " detected";
    console.debug('Hammer', msg)
    msgElement2.textContent = msg
});