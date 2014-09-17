/*
 * Using a self-executing anonymous function to keep the methods in this file out
 * of the global namespace. Found info on these here:
 * http://markdalgleish.com/2011/03/self-executing-anonymous-functions/
 * also on a bunch of other places around the webs.
 */
(function(){
    // The board object to be used throughout the driver
    var board;

    /*
     * Ties in to the document's ready event to start driving the game.
     */
    $(document).ready(function() {
        board = new Board();
        board.RandomStart();
    });

    /*
     * Testing keybindings. This method will wire up which functions to call when one
     * of the arrow keys is pressed.
     */
    $(document).keydown(function(event) {
        switch (event.keyCode) {
            case 37:
                board.ArrowPressLeft();
                break;
            case 38:
                board.ArrowPressUp();
                break;
            case 39:
                board.ArrowPressRight();
                break;
            case 40:
                board.ArrowPressDown();
                break;
        }
    });
})();
