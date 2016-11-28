var numBlock = new Array();
var score = 0;
var hasConflicted = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(document).ready(function() {
    if (documentWidth < 500) {
        prepareForMobile()
    } else {
        gridContainerWidth = 500;
        cellBlockWidth = 100;
        cellGap = 20
    }
    newgame()
});
function prepareForMobile() {
    $("#grid-container").css("width", gridContainerWidth - 2 * cellGap);
    $("#grid-container").css("height", gridContainerWidth - 2 * cellGap);
    $("#grid-container").css("padding", cellGap);
    $("#grid-container").css("border-radius", 0.02 * gridContainerWidth);
    $(".grid-cell").css("width", cellBlockWidth);
    $(".grid-cell").css("height", cellBlockWidth)
}
function newgame() {
    init();
    generateOneNum();
    generateOneNum()
}
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("left", getPostLeft(i, j));
            gridCell.css("top", getPostTop(i, j))
        }
    }
    for (var i = 0; i < 4; i++) {
        numBlock[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            numBlock[i][j] = 0;
            hasConflicted[i][j] = false
        }
    }
    updateBoardView();
    score = 0;
    $("#score").text(score)
}
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + "-" + j + '"></div>');
            var TheNumCell = $("#number-cell-" + i + "-" + j);
            if (numBlock[i][j] == 0) {
                TheNumCell.css("width", "0px");
                TheNumCell.css("height", "0px");
                TheNumCell.css("left", getPostLeft(i, j) + cellBlockWidth / 2);
                TheNumCell.css("top", getPostTop(i, j) + cellBlockWidth / 2);
                TheNumCell.css("font-size", cellGap)
            } else {
                TheNumCell.css("width", cellBlockWidth);
                TheNumCell.css("height", cellBlockWidth);
                TheNumCell.css("left", getPostLeft(i, j));
                TheNumCell.css("top", getPostTop(i, j));
                TheNumCell.css("background-color", getNumberBackgroundColor(numBlock[i][j]));
                TheNumCell.css("color", getNumberColor(numBlock[i][j]));
                TheNumCell.text(getNumberText(numBlock[i][j]))
            }
            hasConflicted[i][j] = false
        }
    }
    $(".number-cell").css("line-height", cellBlockWidth + "px");
    $(".number-cell").css("font-size", 0.3 * cellBlockWidth + "px")
}
function generateOneNum() {
    if (noplace(numBlock)) {
        return false
    }
    var randmX = parseInt(Math.floor(Math.random() * 4));
    var randmY = parseInt(Math.floor(Math.random() * 4));
    var num = 0;
    while (num < 40) {
        if (numBlock[randmX][randmY] == 0) {
            break
        }
        var randmX = parseInt(Math.floor(Math.random() * 4));
        var randmY = parseInt(Math.floor(Math.random() * 4));
        num++
    }
    if (num == 40) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (numBlock[i][j] == 0) {
                    randmX = i;
                    randmY = j
                }
            }
        }
    }
    var randomNum = Math.random() < 0.5 ? 2 : 4;
    numBlock[randmX][randmY] = randomNum;
    showNumWithAnimation(randmX, randmY, randomNum);
    return true
}
$(document).keydown(function(ev) {
    var ev = ev || event;
    switch (ev.keyCode) {
    case 37:
        if (moveLeft()) {
            setTimeout("generateOneNum()", 210);
            setTimeout("isgameover()", 300);
            return false
        }
        break;
    case 38:
        if (moveUp()) {
            setTimeout("generateOneNum()", 210);
            setTimeout("isgameover()", 300);
            return false
        }
        break;
    case 39:
        if (moveRight()) {
            setTimeout("generateOneNum()", 210);
            setTimeout("isgameover()", 300);
            return false
        }
        break;
    case 40:
        if (moveDown()) {
            setTimeout("generateOneNum()", 210);
            setTimeout("isgameover()", 300);
            return false
        }
        break;
    default:
        break
    }
});
document.addEventListener("touchstart",
function(ev) {
    startx = ev.touches[0].pageX;
    starty = ev.touches[0].pageY
});
document.addEventListener("touchmove",
function(ev) {
    ev.preventDefault()
});
document.addEventListener("touchend",
function(ev) {
    endx = ev.changedTouches[0].pageX;
    endy = ev.changedTouches[0].pageY;
    var deltax = endx - startx;
    var deltay = endy - starty;
    if (Math.abs(deltax) < 0.2 * documentWidth && Math.abs(deltay) < 0.2 * documentWidth) {
        return
    }
    if (Math.abs(deltax) > Math.abs(deltay)) {
        if (deltax > 0) {
            if (moveRight()) {
                setTimeout("generateOneNum()", 210);
                setTimeout("isgameover()", 300)
            }
        } else {
            if (moveLeft()) {
                setTimeout("generateOneNum()", 210);
                setTimeout("isgameover()", 300)
            }
        }
    } else {
        if (deltay > 0) {
            if (moveDown()) {
                setTimeout("generateOneNum()", 210);
                setTimeout("isgameover()", 300)
            }
        } else {
            if (moveUp()) {
                setTimeout("generateOneNum()", 210);
                setTimeout("isgameover()", 300)
            }
        }
    }
});
function isgameover() {
    if (noplace(numBlock) && nomove(numBlock)) {
        gameover()
    }
}
function gameover() {
    alert("U,gameover")
}
function moveLeft() {
    if (!canmoveLeft(numBlock)) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (numBlock[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (numBlock[i][k] == 0 && noBlockHorizontal(i, k, j, numBlock)) {
                        showMoveAnimation(i, j, i, k);
                        numBlock[i][k] = numBlock[i][j];
                        numBlock[i][j] = 0;
                        continue
                    } else {
                        if (numBlock[i][k] == numBlock[i][j] && noBlockHorizontal(i, k, j, numBlock) && !hasConflicted[i][j]) {
                            showMoveAnimation(i, j, i, k);
                            numBlock[i][k] += numBlock[i][j];
                            numBlock[i][j] = 0;
                            score += numBlock[i][k];
                            updateScore(score);
                            hasConflicted[i][j] = true;
                            continue
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true
}
function moveRight() {
    if (!canmoveRight(numBlock)) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (numBlock[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (numBlock[i][k] == 0 && noBlockHorizontal(i, j, k, numBlock)) {
                        showMoveAnimation(i, j, i, k);
                        numBlock[i][k] = numBlock[i][j];
                        numBlock[i][j] = 0;
                        continue
                    } else {
                        if (numBlock[i][k] == numBlock[i][j] && noBlockHorizontal(i, j, k, numBlock) && !hasConflicted[i][j]) {
                            showMoveAnimation(i, j, i, k);
                            numBlock[i][k] += numBlock[i][j];
                            numBlock[i][j] = 0;
                            score += numBlock[i][k];
                            hasConflicted[i][j] = true;
                            updateScore(score);
                            continue
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true
}
function moveUp() {
    if (!canmoveUp(numBlock)) {
        return false
    }
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (numBlock[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (numBlock[k][j] == 0 && noBlockVertical(j, k, i, numBlock)) {
                        showMoveAnimation(i, j, k, j);
                        numBlock[k][j] = numBlock[i][j];
                        numBlock[i][j] = 0;
                        continue
                    } else {
                        if (numBlock[k][j] == numBlock[i][j] && noBlockVertical(j, k, i, numBlock) && !hasConflicted[i][j]) {
                            showMoveAnimation(i, j, k, j);
                            numBlock[k][j] += numBlock[i][j];
                            numBlock[i][j] = 0;
                            score += numBlock[k][j];
                            hasConflicted[i][j] = true;
                            updateScore(score);
                            continue
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true
}
function moveDown() {
    if (!canmoveDown(numBlock)) {
        return false
    }
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (numBlock[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (numBlock[k][j] == 0 && noBlockVertical(j, i, k, numBlock)) {
                        showMoveAnimation(i, j, k, j);
                        numBlock[k][j] = numBlock[i][j];
                        numBlock[i][j] = 0;
                        continue
                    } else {
                        if (numBlock[k][j] == numBlock[i][j] && noBlockVertical(j, i, k, numBlock) && !hasConflicted[i][j]) {
                            showMoveAnimation(i, j, k, j);
                            numBlock[k][j] += numBlock[i][j];
                            numBlock[i][j] = 0;
                            score += numBlock[k][j];
                            hasConflicted[i][j] = true;
                            updateScore(score);
                            continue
                        }
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true
};