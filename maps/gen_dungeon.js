/***************************************************************************************
JAVASCRIPT ROGUELIKE
Author: Thomas Gattenhof
Employer: 3rd Sense Australia

About: This is my first jump into the HTML5 world, with shift towards more HTML5
projects in our sector I feel we need to skill up on Javascript in order to have
access to more clients. I don't see this as a replacement to Flash, but as of another
development option we can use.
***************************************************************************************/

var TILESIZE = 64; var ROWS = 40; var COLS = 40;
var vROWS = 9; var vCOLS = 13;
var ACTORS = 10; // number of actors per level, including player, Future Plans: less static, more random
var maps; // Array of map arrays
var level; var levels;
var mapObj;
var player; var playerDisplay;
var playerCameraOffset;
var actorDisplay; var itemDisplay;
var roomArray; // Holds the information for the rooms on the map
var topDisplay; var topDisplayList;
var npcPhase = false;
var scoreArray; var score = 0;
var aStarGraph;
var transitionDirection = "START";
var textGroup; var textGroupChildren = [];
var endText; var endButton; var gameOver = false;

//******************************************************************************************************
// buildMap:
// Make a new dungeon level. The layout is already made but items and monsters need to populate
// If the map has been visited already, use existing data
//******************************************************************************************************
function buildMap() {
    //trace("level: " + level);
    //trace("maps.length: " + maps.length);
    mapObj = maps[level];

    if (mapObj.SCREEN == null) {
        mapObj.SCREEN = initTiles(true);
    } else {
        for (var a in mapObj.SCREEN) {
            for (var b in mapObj.SCREEN[a]) {
                mapObj.SCREEN[a][b].bringToTop();
                mapObj.SCREEN[a][b].visible = true;
            }
        }
    }

    if (mapObj.ACTOR_LIST == null) initActors();
    player = mapObj.ACTOR_LIST[0]; // the player is the first actor in the list

    if (mapObj.ITEM_LIST == null) initItems();

    var ladderPos = { x: player.x, y: player.y };
    if (transitionDirection != "START") {
        //trace("searching for " + transitionDirection);
        for (var a in mapObj.ITEM_LIST) { if (mapObj.ITEM_LIST[a].type == transitionDirection) { ladderPos = { x: mapObj.ITEM_LIST[a].x, y: mapObj.ITEM_LIST[a].y } } };
        //trace("ladderPos: " + ladderPos.x + ", " + ladderPos.y);
    }
    // Player needs to be shifted to the ladder position
    mapObj.ACTOR_MAP[player.y + "_" + player.x] = null;
    player.x = ladderPos.x;
    player.y = ladderPos.y;
    mapObj.ACTOR_MAP[player.y + "_" + player.x] = player;

    drawItems();
    drawActors(); // draw actors into the level

    if (mapObj.OVERLAY == null) {
        mapObj.OVERLAY = initTiles(false);
    } else {
        for (var a in mapObj.OVERLAY) {
            for (var b in mapObj.OVERLAY[a]) {
                mapObj.OVERLAY[a][b].bringToTop();
                mapObj.OVERLAY[a][b].visible = true;
            }
        }
    }

    positionObjects();
    //trace("player: " + player);
    //trace("playerDisplay: " + playerDisplay);
    drawMap();

    for (var a in topDisplayList) {
        if (topDisplayList[a] != null) topDisplayList[a].bringToTop();
    }
    if (textGroup != null) textGroup.destroy(true);
    textGroup = new Phaser.Group(game);
    textGroup.fixedToCamera = true;
    textGroupChildren = [];
    var img = game.add.image(0, 512, "imgTextBox", 0, textGroup);
    img.alpha = 0.4;
    // Look into drawing shapes
	/*var tGraphic = game.add.graphics(0,0,textGroup);
	var tPoly = new Phaser.Polygon([0,0,100,0,100,100,0,100]);
	tGraphic.drawPolygon(tPoly);
	tGraphic.fixedToCamera = true;*/
    scribe(randomDescription('LEVEL'))
    scribe("You are on sub level " + (level + 1));



}
//******************************************************************************************************
// initTiles:
// Build an array of tile sprites for the map
// isScreen = true: Build the actual tiles needed
// isScreen = false: Build all black tiles, to use as a fog of war overlay
//******************************************************************************************************
function initTiles(isScreen) {
    var a = [];
    for (var y = 0; y < ROWS; y++) {
        var newRow = [];
        a.push(newRow);
        for (var x = 0; x < COLS; x++) {
            isScreen ? newRow.push(initCell(mapObj.MAP[y][x], x, y)) : newRow.push(initCell(-1, x, y))
        }
    }
    return a;
}
//******************************************************************************************************
// initCell
// Create a cell for the tile map
//******************************************************************************************************
function initCell(chr, x, y) {
    var tileType = chr == 0 ? 3 : 8;
    var tileSprite = game.add.sprite(TILESIZE * x, (TILESIZE * y) + TILESIZE, "dungeonSheet", chr >= 0 ? tileType : 11);
    tileSprite.tileValue = chr;
    tileSprite.fogValue = 0;
    return tileSprite;
}
//******************************************************************************************************
// drawMap
// draw up the map of the current dungeon level, check tile distance from player position and adjust overlay accordingly
//******************************************************************************************************
function drawMap() {
    for (var y = 0; y < ROWS; y++) {
        for (var x = 0; x < COLS; x++) {
            var cell = mapObj.SCREEN[y][x];
            var overCell = mapObj.OVERLAY[y][x];
            // Is it in range of the player?
            var distance = Math.sqrt(Math.pow(x - player.x, 2) + Math.pow(y - player.y, 2))
            if (distance <= 3) {
                overCell.visible = false;
                cell.fogValue = 2;
            } else {
                if (cell.fogValue == 2) {
                    overCell.visible = true;
                    cell.fogValue = 1;
                    overCell.animations.frame = 7;
                }
            }
        }
    }
}
//******************************************************************************************************
// initMap: 
// Build a new level of the dungeon, an array indicating tile types (currently only floor and wall)
// Future plans: Different terrain types, chasms
//******************************************************************************************************
function initMap() {
    var map = [];
    for (var y = 0; y < ROWS; y++) {
        var newRow = [];
        for (var x = 0; x < COLS; x++) {
            newRow.push(0);
        }
        map.push(newRow);
    }
    roomArray = [];
    var roomCount = 0;
    while (roomCount < 100) {
        var roomCenter = genRoom(map, rn(1, COLS), rn(1, ROWS), rn(2, 6), rn(2, 6))
        if (roomCenter) {
            roomArray.push(roomCenter);
            roomCount = 0;
        } else {
            roomCount++;
        }
    }
    var madeConnections = [];

    for (var i = 0; i < roomArray.length; i++) {
        var x1 = roomArray[i][0];
        var y1 = roomArray[i][1];
        // Grab the closest room
        var closestDistance = 99;
        var closestX;
        var closestY;
        for (var k = 0; k < roomArray.length; k++) {
            var x2 = roomArray[k][0];
            var y2 = roomArray[k][1];

            var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            if (distance < closestDistance && distance > 0) {
                var made = false;
                for (var m = 0; m < madeConnections.length; m++) {
                    var c = madeConnections[m];
                    if (c[0] == x1 && c[1] == y1 && c[2] == x2 && c[3] == y2) made = true;
                    if (c[0] == x2 && c[1] == y2 && c[2] == x1 && c[3] == y1) made = true;
                }
                if (!made) {
                    closestDistance = distance;
                    closestX = x2;
                    closestY = y2;
                }
            }
        }
        madeConnections.push([x1, y1, closestX, closestY]);
        var xLength = x1 - closestX;
        var yLength = y1 - closestY;

        if (xLength < 0) xLength *= -1;
        if (yLength < 0) yLength *= -1;

        if (x1 < closestX) {
            for (var j = x1; j <= closestX; j++) {
                map[y1][j] = 1;
            }
        } else {
            for (var j = x1; j >= closestX; j--) {
                map[y1][j] = 1;
            }
        }
        if (y1 < closestY) {
            for (var j = y1; j <= closestY; j++) {
                map[j][closestX] = 1;
            }
        } else {
            for (var j = y1; j >= closestY; j--) {
                map[j][closestX] = 1;
            }
        }
    }
    var success = true;
    for (var i = 0; i < roomArray.length - 1; i++) {
        aStarGraph = new Graph(map);
        var startX = roomArray[i][0];
        var startY = roomArray[i][1];
        var endX = roomArray[i + 1][0];
        var endY = roomArray[i + 1][1];

        var start = aStarGraph.nodes[startY][startX];
        var end = aStarGraph.nodes[endY][endX];
        var result = astar.search(aStarGraph.nodes, start, end);

        if (result.length == 0) success = false;
    }

    if (!success) {
        return [];
    }
    for (var y in map) {
        for (var x in map[y]) {
            if (!checkSurrounding(map, y, x))
                map[y][x] = 2;
        }
    }

    return map;
}
//******************************************************************************************************
// checkSurrounding
// If the focused tile has only walls around it, it is a dead tile and can be made black
//******************************************************************************************************
function checkSurrounding(map, y, x) {
    y = parseInt(y);
    x = parseInt(x);
    var checkYs = [y];
    var checkXs = [x];
    if (y > 0) checkYs.push(y - 1);
    if (y < ROWS - 1) checkYs.push(y + 1);
    if (x > 0) checkXs.push(x - 1);
    if (x < COLS - 1) checkXs.push(x + 1);

    for (var a in checkYs) {
        for (var b in checkXs) {
            var tY = checkYs[a];
            var tX = checkXs[b];

            if (tY == y && tX == x) continue;
            if (map[tY][tX] > 0) return true;
        }
    }
    return false;
}
//******************************************************************************************************
// randomInt: random int between 0 and max inclusive
// rn: random inter between min and max inclusive
//******************************************************************************************************
function randomInt(max) {
    return Math.floor(Math.random() * max);
}
function rn(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
//******************************************************************************************************
// initActors: 
// Build a new actor list, first actor is always the player, the rest are monsters (for now)
// Future Plans: split up this process, make player on his own, make NPCs, shopkeepers, etc
//******************************************************************************************************
function initActors() {
    // create actors at random locations
    mapObj.ACTOR_LIST = [];
    mapObj.ACTOR_MAP = {};
    for (var e = 0; e < ACTORS; e++) {
        var actor = { x: 0, y: 0, hp: e == 0 ? 3 : 1, name: e == 0 ? "YOU" : "Blockman" }; // create new actor
        do { // pick a random position that is both a floor and not occupied
            actor.y = randomInt(ROWS);
            actor.x = randomInt(COLS);
        } while (mapObj.MAP[actor.y][actor.x] <= 0 || mapObj.ACTOR_MAP[actor.y + "_" + actor.x] != null);
        // add references to the actor to the actors list & map
        mapObj.ACTOR_MAP[actor.y + "_" + actor.x] = actor;
        mapObj.ACTOR_LIST.push(actor);
    }
    //livingEnemies = ACTORS - 1;
}
//******************************************************************************************************
// initItems
// Populate the map with items
//******************************************************************************************************
function initItems() {
    // One item per room, currently scattered randomly around the map, need to put 1 item per room
    mapObj.ITEM_LIST = [];
    mapObj.ITEM_MAP = {};
    for (var e = 0; e < mapObj.ROOM_ARRAY.length; e++) {
        var item = { x: 0, y: 0, type: "COIN", frame: 12 };
        mapObj.ITEM_LIST.push(item);
    }
    // add a fifth of the rooms as mushrooms
    for (e = 0; e < mapObj.ROOM_ARRAY.length / 5; e++) {
        item = { x: 0, y: 0, type: "MUSHROOM", frame: 14 };
        mapObj.ITEM_LIST.push(item);
    }
    // add lots of grass
    for (e = 0; e < mapObj.ROOM_ARRAY.length * 2; e++) {
        item = { x: 0, y: 0, type: "GRASS", frame: 13 };
        mapObj.ITEM_LIST.push(item);
    }
    // Add a ladder going down, if level != 1, add ladder going up

    if (level < levels - 1) {
        //trace("building ladder down");
        mapObj.ITEM_LIST.push({ x: 0, y: 0, type: "LADDER_DOWN", frame: 2 });
    }
    if (level > 0) {
        //trace("building ladder up");
        mapObj.ITEM_LIST.push({ x: 0, y: 0, type: "LADDER_UP", frame: 2 });
    }

    var completeItems = mapObj.ITEM_LIST.length;
    var usedSquares = [];
    while (completeItems > 0) {
        var tX = rn(0, COLS - 1);
        var tY = rn(0, ROWS - 1);
        var txtLoc = String(tX) + "_" + String(tY);
        if (mapObj.MAP[tY][tX] <= 0 || usedSquares.indexOf(txtLoc) >= 0) continue;
        usedSquares.push(txtLoc);
        item = mapObj.ITEM_LIST[completeItems - 1];
        item.x = tX;
        item.y = tY;
        mapObj.ITEM_MAP[item.y + "_" + item.x] = item;
        completeItems--;
    }
}
//******************************************************************************************************
// drawActors:
// make new sprites for the actors and add them to the display list
//******************************************************************************************************
function drawActors() {
    actorDisplay = [];
    for (var a in mapObj.ACTOR_LIST) {
        if (mapObj.ACTOR_LIST[a] != null && mapObj.ACTOR_LIST[a].hp > 0) {
            var tileType = a == 0 ? 1 : 10;
            var tSprite = game.add.sprite(TILESIZE * mapObj.ACTOR_LIST[a].x, (TILESIZE * mapObj.ACTOR_LIST[a].y) + TILESIZE, "dungeonSheet", tileType);
            actorDisplay.push(tSprite);
        }
    }
    playerDisplay = actorDisplay[0];
}
//******************************************************************************************************
// drawItems:
// make new sprites for the items and add them to the display list
//******************************************************************************************************
function drawItems() {
    itemDisplay = [];
    for (var a in mapObj.ITEM_LIST) {
        if (mapObj.ITEM_LIST[a] != null) {
            var tileType = mapObj.ITEM_LIST[a].frame;
            var tSprite = game.add.sprite(TILESIZE * mapObj.ITEM_LIST[a].x, (TILESIZE * mapObj.ITEM_LIST[a].y) + TILESIZE, "dungeonSheet", tileType);
            itemDisplay.push(tSprite);
        }
    }
}
//******************************************************************************************************
// canGo:
// Checking if the focued actor can move in the direction requested
//******************************************************************************************************
function canGo(actor, dir) {
    return actor.x + dir.x >= 0 &&
        actor.x + dir.x <= COLS - 1 &&
        actor.y + dir.y >= 0 &&
        actor.y + dir.y <= ROWS - 1 &&
        mapObj.MAP[actor.y + dir.y][actor.x + dir.x] == 1;
}
//******************************************************************************************************
// genRoom:
// Part of the initMap process, which generates whole rooms if there is space, they are linked up with
// corridoors after creation.
//******************************************************************************************************
function genRoom(map, xPos, yPos, width, height) {
    //trace('genRoom 1');
    if (yPos + height >= ROWS - 1) return false;
    if (xPos + width >= COLS - 1) return false;
    var intersect = false;
    //trace('genRoom 2');
    for (var y = yPos - 1; y < yPos + height + 1; y++) {
        //trace('genRoom 2A');
        for (var x = xPos - 1; x < xPos + width + 1; x++) {
            //trace('genRoom 2B ' + y);
            //trace('map ' + map);
            //trace('map.length ' + map.length);
            if (y < 0 || y >= map.length) continue;
            //trace('genRoom 2Ba');
            if (x < 0 || x >= map[y].length) continue;
            //trace('genRoom 2Bb');
            if (map[y][x] != 0 && map[y][x] != null) return false;
            //trace('genRoom 2Bc');
        }
    }
    //trace('genRoom 3');
    for (var y = yPos; y < yPos + height; y++) {
        for (var x = xPos; x < xPos + width; x++) {
            map[y][x] = 1;
        }
    }
    //trace('genRoom 4');
    var roomCenter = [Math.floor(xPos + (width / 2)), Math.floor(yPos + (height / 2))];
    return roomCenter;
}
//******************************************************************************************************
// aStar and graph code
// two working engines, minimized for space reasons.
// Future Plans: Find a way to link to these JS files so I don't need to add them here
//******************************************************************************************************
var astar = { init: function (e) { for (var t = 0, n = e.length; t < n; t++) { for (var r = 0, i = e[t].length; r < i; r++) { var s = e[t][r]; s.f = 0; s.g = 0; s.h = 0; s.cost = s.type; s.visited = false; s.closed = false; s.parent = null } } }, heap: function () { return new BinaryHeap(function (e) { return e.f }) }, search: function (e, t, n, r, i) { astar.init(e); i = i || astar.manhattan; r = !!r; var s = astar.heap(); s.push(t); while (s.size() > 0) { var o = s.pop(); if (o === n) { var u = o; var a = []; while (u.parent) { a.push(u); u = u.parent } return a.reverse() } o.closed = true; var f = astar.neighbors(e, o, r); for (var l = 0, c = f.length; l < c; l++) { var h = f[l]; if (h.closed || h.isWall()) { continue } var p = o.g + h.cost; var d = h.visited; if (!d || p < h.g) { h.visited = true; h.parent = o; h.h = h.h || i(h.pos, n.pos); h.g = p; h.f = h.g + h.h; if (!d) { s.push(h) } else { s.rescoreElement(h) } } } } return [] }, manhattan: function (e, t) { var n = Math.abs(t.x - e.x); var r = Math.abs(t.y - e.y); return n + r }, neighbors: function (e, t, n) { var r = []; var i = t.x; var s = t.y; if (e[i - 1] && e[i - 1][s]) { r.push(e[i - 1][s]) } if (e[i + 1] && e[i + 1][s]) { r.push(e[i + 1][s]) } if (e[i] && e[i][s - 1]) { r.push(e[i][s - 1]) } if (e[i] && e[i][s + 1]) { r.push(e[i][s + 1]) } if (n) { if (e[i - 1] && e[i - 1][s - 1]) { r.push(e[i - 1][s - 1]) } if (e[i + 1] && e[i + 1][s - 1]) { r.push(e[i + 1][s - 1]) } if (e[i - 1] && e[i - 1][s + 1]) { r.push(e[i - 1][s + 1]) } if (e[i + 1] && e[i + 1][s + 1]) { r.push(e[i + 1][s + 1]) } } return r } }
function Graph(e) { var t = []; for (var n = 0; n < e.length; n++) { t[n] = []; for (var r = 0, i = e[n]; r < i.length; r++) { t[n][r] = new GraphNode(n, r, i[r]) } } this.input = e; this.nodes = t } function GraphNode(e, t, n) { this.data = {}; this.x = e; this.y = t; this.pos = { x: e, y: t }; this.type = n } function BinaryHeap(e) { this.content = []; this.scoreFunction = e } var GraphNodeType = { OPEN: 1, WALL: 0 }; Graph.prototype.toString = function () { var e = "\n"; var t = this.nodes; var n, r, i, s; for (var o = 0, u = t.length; o < u; o++) { n = ""; r = t[o]; for (i = 0, s = r.length; i < s; i++) { n += r[i].type + " " } e = e + n + "\n" } return e }; GraphNode.prototype.toString = function () { return "[" + this.x + " " + this.y + "]" }; GraphNode.prototype.isWall = function () { return this.type == GraphNodeType.WALL }; BinaryHeap.prototype = { push: function (e) { this.content.push(e); this.sinkDown(this.content.length - 1) }, pop: function () { var e = this.content[0]; var t = this.content.pop(); if (this.content.length > 0) { this.content[0] = t; this.bubbleUp(0) } return e }, remove: function (e) { var t = this.content.indexOf(e); var n = this.content.pop(); if (t !== this.content.length - 1) { this.content[t] = n; if (this.scoreFunction(n) < this.scoreFunction(e)) { this.sinkDown(t) } else { this.bubbleUp(t) } } }, size: function () { return this.content.length }, rescoreElement: function (e) { this.sinkDown(this.content.indexOf(e)) }, sinkDown: function (e) { var t = this.content[e]; while (e > 0) { var n = (e + 1 >> 1) - 1, r = this.content[n]; if (this.scoreFunction(t) < this.scoreFunction(r)) { this.content[n] = t; this.content[e] = r; e = n } else { break } } }, bubbleUp: function (e) { var t = this.content.length, n = this.content[e], r = this.scoreFunction(n); while (true) { var i = e + 1 << 1, s = i - 1; var o = null; if (s < t) { var u = this.content[s], a = this.scoreFunction(u); if (a < r) o = s } if (i < t) { var f = this.content[i], l = this.scoreFunction(f); if (l < (o === null ? r : a)) { o = i } } if (o !== null) { this.content[e] = this.content[o]; this.content[o] = n; e = o } else { break } } } }


var result = []
while (result.length === 0) {
    result = initMap();
}
var row;
for (var i = 0; i < result.length; i++) {
    row = ""
    for (var j = 0; j < result[i].length; j++) {
        row += result[i][j]
    }
    console.log(row);
}
