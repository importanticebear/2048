function Cell(position) {
    return $("<div/>", {
        class: "cell",
        id: position
    }).append($("<div/>", {
        class: "spacer"
    }).text("0"));
}
