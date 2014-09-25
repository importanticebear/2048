function Cell(position) {
    return $("<div/>", {
        class: "cell",
        id: position,
        left: Board.GetLeft(position),
        top: Board.GetTop(position)
    });
}
