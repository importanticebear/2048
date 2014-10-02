/*
 * Represents the part of the game board where tiles get placed.
 */
function Cell(position) {
    /*
     * TODO
     * I'd put in the .spacer div after making some changes
     * to the styles and means of rendering the cells which
     * stopped the divs from rendering at all since they
     * appeared to the browser as not having any content.
     *
     * I'm not sure if the spacer divs are required anymore
     * so I'd like to get rid of them if I can. Could probably
     * just comment out the appends and see if things still
     * work.
     */
    return $("<div/>", {
        class: "cell",
        id: position
    }).append($("<div/>", {
        class: "spacer"
    }).text("0"));
}
