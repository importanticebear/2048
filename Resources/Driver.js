/*
 * This should contain all of the static initializer methods and event listeners
 * which aren't meant to be called from other JavaScripts. They don't fit in as
 * members of a class and, as far as I can see, there isn't a way to put these in
 * a namespace even if it was meaningful to do so. This is going to be the one
 * exception to defining JS files in namespaces as outlined in Issue #6 here:
 * https://github.com/jrconner384/2048/issues/6
 */

/*
 * Ties in to the document's ready event to start driving the game.
 */
$(document).ready(function() {
    var board = new Board();
    board.EmptyAllCells();
    board.RandomStart();
});

/*
 * Testing keybindings. This method will wire up which functions to call when one
 * of the arrow keys is pressed.
 */
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            alert('left');
            break;
        case 38:
            alert('up');
            break;
        case 39:
            alert('right');
            break;
        case 40:
            alert('down');
            break;
    }
});
