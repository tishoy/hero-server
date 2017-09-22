/**
 * Created by motionwalk on 16/4/18.
 */

function MapProperties() {
    this.width = 310, this.height = 310, this.tileSize = 20
}

Map.prototype = {
    setUp: function (a) {
        a = a || {}, this.mapProperties.width = void 0 != a.width ? a.width + 10 : 310, this.mapProperties.height = void 0 != a.height ? a.height + 10 : 310, this.mapProperties.tileSize = void 0 != a.tileSize ? a.tileSize : 20, this.cols = Math.floor((this.mapProperties.width - 2 * this.mapMargin) / this.mapProperties.tileSize), this.rows = Math.floor((this.mapProperties.height - 2 * this.mapMargin) / this.mapProperties.tileSize); for (var t = 0; t < this.rows; t++) {
            this.mapData[t] = []; for (var e = 0; e < this.cols; e++)
                this.mapData[t][e] = 2, t % 2 == 0 && e % 2 == 0 && (this.mapData[t][e] = 0)
        }
    }
};

function Map() {
    this.mapProperties = new MapProperties,
        this.rows = 0, this.cols = 0, this.mapMargin = 5, this.mapData = []
}
function init() {
    map = new Map,
        map.setUp({
            width: 255,
            height: 255,
            tileSize: 5
        }),
        tileSize = map.mapProperties.tileSize, points = [];
    for (var a = 0; a < map.rows; a++)
        for (var t = 0; t < map.cols; t++)
            points.push({ row: a, col: t, value: map.mapData[a][t] });
    // svg = d3.select("#svg-1").append("svg").attr({
    //     width: map.mapProperties.width,
    //     height: map.mapProperties.height
    // });
    // var e = svg.append("g");
    // e.append("rect").attr("width", map.mapProperties.width - 1).
    // attr("height", map.mapProperties.height - 1).
    // attr("fill", "#eee").attr("stroke-width", 1).attr("stroke", "#bbb"), 
    // e.append("rect").attr("x", map.mapMargin - 1).attr("y", map.mapMargin - 1).attr("width", map.mapProperties.width - 2 * map.mapMargin + 1).attr("height", map.mapProperties.height - 2 * map.mapMargin + 1).attr("stroke-width", 1).attr("stroke", "#aaa"),
    //  svg.append("g").attr("id", "tiles").selectAll("rect").data(points).enter().append("rect").attr("width", tileSize - 1).attr("height", tileSize - 1).attr("x", function (a) { 
    // return map.mapMargin + a.col * tileSize }).attr("y", function (a) { return map.mapMargin + a.row * tileSize }).attr("fill", function (a) { switch (a.value) { case 0: return "#bbb"; case 1: return "#fff"; case 2: return "#aaa" } }).attr("stroke-width", 1).attr("stroke", function (a) { switch (a.value) { case 0: return "#bbb"; case 1: return "#fff"; case 2: return "#aaa" } }), map2 = new Map, map2.setUp({ width: 250, height: 250, tileSize: 10 }), tileSize2 = map2.mapProperties.tileSize, points2 = []; for (var r = 0; r < map2.rows; r++)for (var i = 0; i < map2.cols; i++)points2.push({ row: r, col: i, value: map2.mapData[r][i] }); svg2 = d3.select("#svg-2").append("svg").attr({ width: map2.mapProperties.width, height: map2.mapProperties.height }); var p = svg2.append("g"); p.append("rect").attr("width", map2.mapProperties.width - 1).attr("height", map2.mapProperties.height - 1).attr("fill", "#eee").attr("stroke-width", 1).attr("stroke", "#bbb"), 
    // p.append("rect").attr("x", map2.mapMargin - 1).attr("y", map2.mapMargin - 1).attr("width", map2.mapProperties.width - 2 * map2.mapMargin + 1).attr("height", map2.mapProperties.height - 2 * map2.mapMargin + 1).attr("stroke-width", 1).attr("stroke", "#aaa"), svg2.append("g").attr("id", "tiles2").selectAll("rect").data(points2).enter().append("rect").attr("width", tileSize2 - 1).attr("height", tileSize2 - 1).attr("x",
    //     function (a) { return map2.mapMargin + a.col * tileSize2 }).attr("y",
    //     function (a) { return map2.mapMargin + a.row * tileSize2 }).attr("fill",
    //     function (a) {
    //         switch (a.value) {
    //             case 0: return "#bbb";
    //             case 1: return "#fff";
    //             case 2: return "#aaa"
    //         }
    //     }).attr("stroke-width", 1).attr("stroke",
    //     function (a) {
    //         switch (a.value) {
    //             case 0: return "#bbb";
    //             case 1: return "#fff";
    //             case 2: return "#aaa"
    //         }
    //     })
}


function draw() {
    points = [];
    var one_row;
    for (var a = 0; a < map.rows; a++) {
        one_row = "";
        for (var t = 0; t < map.cols; t++) {
            points.push({ row: a, col: t, value: map.mapData[a][t] });
            one_row += map.mapData[a][t]
        }
        console.log(one_row)
    }
    // svg.select("#tiles").selectAll("rect").data(points).attr("fill", function (a) { switch (a.value) { case 0: return "#bbb"; case 1: return "#fff"; case 2: return "#aaa" } }).attr("stroke-width", 1).attr("stroke", function (a) { switch (a.value) { case 0: return "#bbb"; case 1: return "#fff"; case 2: return "#aaa" } })
}

function query(start) {
    var x = start.x, y = start.y;
    var dirs = '';
    if ((y - 2 >= 0) && (map.mapData[y - 2][x] == 0)) dirs += 'N';
    if ((x - 2 >= 0) && (map.mapData[y][x - 2] == 0)) dirs += 'W';
    if ((y + 2 < map.rows) && (map.mapData[y + 2][x] == 0)) dirs += 'S';
    if ((x + 2 < map.cols) && (map.mapData[y][x + 2] == 0)) dirs += 'E';

    if (dirs == '') {
        moves.pop();
        if (moves.length == 0)
            draw();
        else
            query(moves[moves.length - 1]);
    } else {
        var dir = dirs.substr(Math.floor(Math.random() * dirs.length), 1);

        switch (dir) {
            case 'N':
                map.mapData[y - 1][x] = 1;
                y = y - 2;
                break;
            case 'W':
                map.mapData[y][x - 1] = 1;
                x = x - 2;
                break;
            case 'S':
                map.mapData[y + 1][x] = 1;
                y = y + 2;
                break;
            case 'E':
                map.mapData[y][x + 1] = 1;
                x = x + 2;
                break;
        }
        map.mapData[y][x] = 1;
        moves.push({ y: y, x: x });
        query({ y: y, x: x });
    }
}


function reset() {
    for (var a = 0; a < map.rows; a++)
        for (var t = 0; t < map.cols; t++)
            map.mapData[a][t] = 2, a % 2 == 0 && t % 2 == 0 && (map.mapData[a][t] = 0);
    draw()
}

function caculation() {
    var a = { y: 0, x: 0 };
    map.mapData[0][0] = 1,
        moves = [],
        moves.push({ y: 0, x: 0 }),
        query(a, 1)
    console.log(moves)
}

init();

caculation();

return

function query2(a) {
    var t = a.x, e = a.y, r = ""; if (e - 2 >= 0 && 0 == map2.mapData[e - 2][t] && (r += "N"), t - 2 >= 0 && 0 == map2.mapData[e][t - 2] && (r += "W"), e + 2 < map2.rows && 0 == map2.mapData[e + 2][t] && (r += "S"), t + 2 < map2.cols && 0 == map2.mapData[e][t + 2] && (r += "E"), "" == r) moves2.pop(), 0 == moves2.length ? draw2(!1, { y: 0, x: 0 }, !0) : draw2(!1, { y: 0, x: 0 }, !1); else { var i = r.substr(Math.floor(Math.random() * r.length), 1); switch (i) { case "N": map2.mapData[e - 1][t] = 1, e -= 2; break; case "W": map2.mapData[e][t - 1] = 1, t -= 2; break; case "S": map2.mapData[e + 1][t] = 1, e += 2; break; case "E": map2.mapData[e][t + 1] = 1, t += 2 }map2.mapData[e][t] = 1, moves2.push({ y: e, x: t }), draw2(!0, { y: e, x: t }, !1) }
}
function reset2() {
    for (var a = 0; a < map2.rows; a++)
        for (var t = 0; t < map2.cols; t++)map2.mapData[a][t] = 2, a % 2 == 0 && t % 2 == 0 && (map2.mapData[a][t] = 0); draw2()
}
function caculation2() {
    var a = { y: 0, x: 0 }; map2.mapData[0][0] = 1, moves2 = [], moves2.push({ y: 0, x: 0 }), query2(a)
}
function draw2(a, t, e) {
    points2 = []; for (var r = 0; r < map2.rows; r++)
        for (var i = 0; i < map2.cols; i++)points2.push({ row: r, col: i, value: map2.mapData[r][i] }); if (svg2.select("#tiles2").selectAll("rect").data(points2).transition().attr("fill", function (a) { switch (a.value) { case 0: return "#bbb"; case 1: return "#fff"; case 2: return "#aaa"; case 3: return "#ddd" } }).attr("stroke-width", 1).attr("stroke", function (a) { switch (a.value) { case 0: return "#bbb"; case 1: return "#fff"; case 2: return "#aaa"; case 3: return "#ddd" } }).duration(50), e) { console.log("end"); for (var r = 0; r < map2.rows; r++)for (var i = 0; i < map2.cols; i++)map2.mapData[r][i] = 2, r % 2 == 0 && i % 2 == 0 && (map2.mapData[r][i] = 0); $("#gen2").attr("disabled", !1), $("#reset2").attr("disabled", !1) } else setTimeout(function () { if (a) query2(t); else { var e = moves2[moves2.length - 1]; map2.mapData[e.y][e.x] = 3, query2(e) } }, 50)
}



var map, map2, tileSize, tileSize2, points, points2, moves, moves2, svg, svg2; jQuery(document).ready(function () {
    init(), $("#gen1").on("click", function () { caculation() }), $("#reset1").on("click", function () { reset() }), $("#gen2").on("click", function () { caculation2(), $("#gen2").attr("disabled", !0), $("#reset2").attr("disabled", !0) }),
        $("#reset2").on("click", function () { reset2(), $("#gen2").attr("disabled", !1), $("#reset2").attr("disabled", !1) })
});