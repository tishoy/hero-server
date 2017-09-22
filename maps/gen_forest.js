const TILE_FLOOR = 0
const TILE_WALL = 1

var generation_params = () => {
    return {
        r1_cutoff: 0,
        r2_cutoff: 0,
        reps: 0
    }
}

var grid = [];
var grid2 = [];

var fillprob = 40;
var r1_cutoff = 5, r2_cutoff = 2;
var size_x = 64, size_y = 20;
var params = {}
// {
//     r1_cutoff: 0,
//     r2_cutoff: 0,
//     reps: 0
// };

var params_set = []
// {
//     r1_cutoff: 0,
//     r2_cutoff: 0,
//     reps: 0
// };

var generations = 0;

function randpick() {
    if (Math.random() * 100 < fillprob)
        return TILE_WALL;
    else
        return TILE_FLOOR;
}

function initmap() {
    var xi, yi;

    grid = [];
    grid2 = [];

    for (yi = 0; yi < size_y; yi++) {
        grid[yi] = [];
        grid2[yi] = [];
    }

    for (yi = 1; yi < size_y - 1; yi++)
        for (xi = 1; xi < size_x - 1; xi++)
            grid[yi][xi] = randpick();

    for (yi = 0; yi < size_y; yi++)
        for (xi = 0; xi < size_x; xi++)
            grid2[yi][xi] = TILE_WALL;

    for (yi = 0; yi < size_y; yi++)
        grid[yi][0] = grid[yi][size_x - 1] = TILE_WALL;
    for (xi = 0; xi < size_x; xi++)
        grid[0][xi] = grid[size_y - 1][xi] = TILE_WALL;
    printmap()
    // console.log(grid)
}

function generation() {
    var xi, yi, ii, jj;
    var row
    for (yi = 1; yi < size_y - 1; yi++) {
        row = "";
        for (xi = 1; xi < size_x - 1; xi++) {
            var adjcount_r1 = 0,
                adjcount_r2 = 0;

            for (ii = -1; ii <= 1; ii++)
                for (jj = -1; jj <= 1; jj++) {
                    if (grid[yi + ii][xi + jj] != TILE_FLOOR)
                        adjcount_r1++;
                }
            for (ii = yi - 2; ii <= yi + 2; ii++)
                for (jj = xi - 2; jj <= xi + 2; jj++) {
                    if (Math.abs(ii - yi) == 2 && Math.abs(jj - xi) == 2)
                        continue;
                    if (ii < 0 || jj < 0 || ii >= size_y || jj >= size_x)
                        continue;
                    if (grid[ii][jj] != TILE_FLOOR)
                        adjcount_r2++;
                }
            if (adjcount_r1 >= params.r1_cutoff || adjcount_r2 <= params.r2_cutoff) {
                grid2[yi][xi] = TILE_WALL;
                row += TILE_WALL;
            }
            else {
                grid2[yi][xi] = TILE_FLOOR;
                row += TILE_WALL;
            }
        }
        console.log(row)
    }
    for (yi = 1; yi < size_y - 1; yi++) {
        for (xi = 1; xi < size_x - 1; xi++) {
            grid[yi][xi] = grid2[yi][xi];
        }
    }
}

function printfunc() {
    var ii;

    console.log("W[0](p) = rand[0,100) < %i\n", fillprob);

    for (ii = 0; ii < generations; ii++) {
        console.log("Repeat %i: W'(p) = R[1](p) >= %i",
            params_set[ii].reps, params_set[ii].r1_cutoff);

        if (params_set[ii].r2_cutoff >= 0)
            console.log(" || R[2](p) <= %i\n", params_set[ii].r2_cutoff);
        else
            console.log('\n');
    }
}

function printmap() {
    var xi, yi;
    var row
    for (yi = 0; yi < size_y; yi++) {
        row = "";
        for (xi = 0; xi < size_x; xi++) {
            switch (grid[yi][xi]) {
                case TILE_WALL: row += '#'; break;
                case TILE_FLOOR: row += '.'; break;
            }
        }
        console.log(row)
    }
}

// 多次执行
function main(argc, argv) {
    var ii, jj;

    if (argc < 7) {
        console.log("Usage:" + argv[0] + "xsize ysize fill (r1 r2 count)+\n", );
        return 1;
    }
    size_x = (argv[1]);
    size_y = (argv[2]);
    fillprob = (argv[3]);

    generations = (argc - 4) / 3;


    params_set = [];

    for (ii = 4; ii + 2 < argc; ii += 3) {
        params = generation_params()
        params.r1_cutoff = (argv[ii]);
        params.r2_cutoff = (argv[ii + 1]);
        params.reps = (argv[ii + 2]);
        params_set.push(params);
    }

    // srand(time(NULL));

    initmap();

    for (ii = 0; ii < generations; ii++) {
        params = params_set[ii];
        for (jj = 0; jj < params.reps; jj++)
            generation();
    }
    printfunc();
    printmap();
    return 0;
}

initmap();
// main(10, [0, 5, 2, 40, 5, 2, 60, 5, 2, 50])

// initmap();
// printmap();