(function(){
    const TILE_SIZE = 5; // 5px per tile for 100x100 map in 500x500 canvas
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const dialogEl = document.getElementById('dialog');

    const hero = { x: 5, y: 5, dir: 'down' };
    let npcs = [];

    // Load NPC data
    fetch('npc01.json')
        .then(r => r.json())
        .then(data => { npcs = data; draw(); });

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // draw map
        for(let y=0;y<map01.height;y++){
            for(let x=0;x<map01.width;x++){
                if(map01.tiles[y][x] === 1){
                    ctx.fillStyle = '#666';
                }else{
                    ctx.fillStyle = '#99cc99';
                }
                ctx.fillRect(x*TILE_SIZE,y*TILE_SIZE,TILE_SIZE,TILE_SIZE);
            }
        }
        // draw NPCs
        ctx.fillStyle = '#0000ff';
        npcs.forEach(n => {
            ctx.fillRect(n.x*TILE_SIZE, n.y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });
        // draw hero
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(hero.x*TILE_SIZE, hero.y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    function tryMove(dx,dy,dir){
        hero.dir = dir;
        const nx = hero.x + dx;
        const ny = hero.y + dy;
        if(nx<0 || ny<0 || nx>=map01.width || ny>=map01.height) return;
        if(map01.tiles[ny][nx] === 0){
            hero.x = nx;
            hero.y = ny;
        }
        draw();
    }

    function facingNpc(){
        let dx=0,dy=0;
        if(hero.dir==='up') dy=-1;
        if(hero.dir==='down') dy=1;
        if(hero.dir==='left') dx=-1;
        if(hero.dir==='right') dx=1;
        const tx = hero.x + dx;
        const ty = hero.y + dy;
        return npcs.find(n=>n.x===tx && n.y===ty);
    }

    window.addEventListener('keydown', function(e){
        switch(e.key){
            case 'ArrowUp':
            case 'w':
                tryMove(0,-1,'up');
                break;
            case 'ArrowDown':
            case 's':
                tryMove(0,1,'down');
                break;
            case 'ArrowLeft':
            case 'a':
                tryMove(-1,0,'left');
                break;
            case 'ArrowRight':
            case 'd':
                tryMove(1,0,'right');
                break;
            case ' ':
                const npc = facingNpc();
                if(npc){
                    dialogEl.textContent = npc.dialogue.join(' ');
                }
                break;
        }
    });

    draw();
})();
