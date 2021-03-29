/**
 * Script for pan
 */
console.debug('loading hammer-panel-1')
var myElement = document.getElementById('hammer-panel-1');

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
mc.on("panleft panright panup pandown tap press", function (ev) {
    let msg = ev.type + " gesture detected.";
    myElement.textContent = msg
    console.debug('Hammer event', 'Pan', msg)
});



// /**
//  * Script for swipe
//  */

console.debug('loading hammer-panel-2')
var myElement2 = document.getElementById('hammer-panel-2');
Hammer(myElement2).on('swiperight swipeleft', function (ev) {
  // animate blok
//   $('#block').animate({'margin-left': '-310px'}, 1000);
let msg = ev.type + " detected";
 console.debug('Hammer', msg)
 myElement2.textContent = msg
});