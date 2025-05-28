// Simple map data for 100x100 grid
window.map01 = {
    width: 100,
    height: 100,
    tiles: [], // 0 passable, 1 wall
    events: {}
};

for (let y = 0; y < map01.height; y++) {
    map01.tiles[y] = [];
    for (let x = 0; x < map01.width; x++) {
        map01.tiles[y][x] = 0; // default passable
    }
}

// Surround edges with walls
for (let i = 0; i < map01.width; i++) {
    map01.tiles[0][i] = 1;
    map01.tiles[map01.height-1][i] = 1;
    map01.tiles[i][0] = 1;
    map01.tiles[i][map01.width-1] = 1;
}
