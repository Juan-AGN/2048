let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let win = 0;

const timing = {
    duration: 258,
    iterations: 1,
};

let score = 0;

let size = 4;

let size2 = 4;

let onuse = 1;

let scorediv;

console.log(grid);

function get_random_int(max) {
    return Math.floor(Math.random() * (max + 1));
}

function load_score() {
    scorediv = document.getElementById('scores');
    
    scorediv.innerHTML = `<p class="scorep">SCORE: ${score}</p>`;
}

function start() {
    let num1 = get_random_int(4);
    let num2;

    if (num1 < 2)
        num1 = 2;
    else
        num1 = 4
    grid[get_random_int(3)][get_random_int(3)] = num1;
    while (check_numbers_grid(2) > 0)
    {
        num2 = get_random_int(4);
        if (num2 < 2)
            num2 = 2;
        else
            num2 = 4;
        grid[get_random_int(3)][get_random_int(3)] = num2;
    }
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size2; j ++) {
            console.log(grid[i][j]);
        }
    }
    fillgrid();
    load_score()
    onuse = 0;
    console.log(grid);
}

function fillgrid(){
    const grid_html = document.getElementById('main-grid');
    let html = "";

    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size2; j ++) {
            if (grid[i][j] == 0)
                html += `<div class=node_empty style="grid-column: ${j + 1}; grid-row: ${i + 1};"></div>`;
            else
            {
                html += `<div class=node_empty style="grid-column: ${j + 1}; grid-row: ${i + 1};"></div>`;
                html += `<div class=node id="box${i}-${j}" style="background-color: rgb(${get_color(grid[i][j], 1) - get_color(grid[i][j], 0)} , ${get_color(grid[i][j], 1) - get_color(grid[i][j], 0)}, ${get_color(grid[i][j], 1)}); grid-column: ${j + 1}; grid-row: ${i + 1};"><p1 style="color: rgb(${get_color(grid[i][j], 0)}, ${get_color(grid[i][j], 0)}, ${get_color(grid[i][j], 0)});" class="boxed-text">${grid[i][j]}</p1></div>`;
            }
        }
    }
    grid_html.innerHTML = html;
}

function anim_move_left(i, j, i2, j2) {
    console.log("Element found:", "box" + i + "-" + j);
    let tomove = document.getElementById("box" + i + "-" + j);
  
    tomove.animate([
      { transform: `translate(${(j2 - j) * (document.getElementById('main-grid').offsetWidth / 4)}px, ${i2 - i}px)` },
    ], timing);
}

function anim_move_right(i, j, i2, j2) {
    console.log("Element found:", "box" + i + "-" + j);
    let tomove = document.getElementById("box" + i + "-" + j);
  
    tomove.animate([
      { transform: `translate(${(j2 - j) * (document.getElementById('main-grid').offsetWidth / 4)}px, ${i2 - i}px)` },
    ], timing);
}

function anim_move_up(i, j, i2, j2) {
    console.log(document.getElementById('main-grid').offsetWidth / 100);
    let tomove = document.getElementById("box" + i + "-" + j);
  
    tomove.animate([
      { transform: `translate(${j2 - j}px, ${(i2 - i) * (document.getElementById('main-grid').offsetHeight / 4)}px)` },
    ], timing);
}

function anim_move_down(i, j, i2, j2) {
    console.log("Element found:", "box" + i + "-" + j);
    let tomove = document.getElementById("box" + i + "-" + j);
  
    tomove.animate([
      { transform: `translate(${j2 - j}px, ${(i2 - i) * document.getElementById('main-grid').offsetHeight / 4}px)` },
    ], timing);
}

function get_color(num, mode) {
    if (mode == 0)
        return Math.sqrt(num) * 4;
    else
        return (255 - (Math.sqrt(num) * 4));
}

function left() {
    let detecter;
    let max = 0;

    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size2; j ++) {
            detecter = 0;
            if (j > max)
                max = j;
            while (move_left(i, j) != 0)
            {
                console.log("Moving " + i + "-" + j)
                j --;
                console.log("to " + i + "-" + j)
                detecter = 1;
            }
            if (detecter == 1)
                anim_move_left(i, max, i, j);
        }
        max = 0;
    }
}

function move_left (i, j) {
    if (j == 0 || grid[i][j] == 0)
        return 0;
    else if (grid[i][j - 1] != grid[i][j] && grid[i][j - 1] != 0)
        return 0;
    else if (grid[i][j - 1] == grid[i][j])
    {
        grid[i][j - 1] += grid[i][j];
        score += grid[i][j - 1];
    }
    else
        grid[i][j - 1] = grid[i][j];
    console.log("change " + grid[i][j]);
    grid[i][j] = 0;
    console.log("changed " + grid[i][j]);
    return 1;
}

function up() {
    let detecter;
    let max = 0;
    
    for (let j = 0; j < size2; j ++) {
        for (let i = 0; i < size; i ++) {
            detecter = 0;
            if (i > max)
                max = i;
            while (move_up(i, j) != 0)
            {
                console.log("Moving " + i + "-" + j)
                i --;
                console.log("to " + i + "-" + j)
                detecter = 1;
            }
            if (detecter == 1)
                anim_move_up(max, j, i, j);
        }
        max = 0;
    }
}
function move_up (i, j) {
    if (i == 0 || grid[i][j] == 0)
        return 0;
    else if (grid[i - 1][j] != grid[i][j] && grid[i - 1][j] != 0)
        return 0;
    else if (grid[i - 1][j] == grid[i][j])
    {
        grid[i - 1][j] += grid[i][j];
        score += grid[i - 1][j];
    }
    else
        grid[i - 1][j] = grid[i][j];
    console.log("change " + grid[i][j]);
    grid[i][j] = 0;
    console.log("changed " + grid[i][j]);
    return 1;
}


function down() {
    let detecter;
    let max = size - 1;

    for (let j = size2 - 1; j > -1; j --) {
        for (let i = size - 1; i > -1; i --) {
            detecter = 0;
            if (i < max)
                max = i;
            while (move_down(i, j) != 0)
            {
                console.log("Moving " + i + "-" + j)
                i ++;
                console.log("to " + i + "-" + j)
                detecter = 1;
            }
            if (detecter == 1)
                anim_move_down(max, j, i, j);
        }
        max = size - 1;
    }
}
function move_down (i, j) {
    if (i == size - 1 || grid[i][j] == 0)
        return 0;
    else if (grid[i + 1][j] != grid[i][j] && grid[i + 1][j] != 0)
        return 0;
    else if (grid[i + 1][j] == grid[i][j])
    {
        grid[i + 1][j] += grid[i][j];
        score += grid[i + 1][j];
    }
    else
        grid[i + 1][j] = grid[i][j];
    console.log("change " + grid[i][j]);
    grid[i][j] = 0;
    console.log("changed " + grid[i][j]);
    return 1;
}

function right() {
    let detecter;
    let max = size2 - 1;

    for (let i = size - 1; i > -1; i --) {
        for (let j = size2 - 1; j > -1; j --) {
            detecter = 0;
            if (j < max)
                max = j;
            while (move_right(i, j) != 0)
            {
                console.log("Moving " + i + "-" + j)
                j ++;
                console.log("to " + i + "-" + j)
                detecter = 1;
            }
            console.log(max);
            if (detecter == 1)
                anim_move_right(i, max, i, j);
        }
        max = size2 - 1;
    }
}
function move_right (i, j) {
    if (j == size - 1 || grid[i][j] == 0)
        return 0;
    else if (grid[i][j + 1] != grid[i][j] && grid[i][j + 1] != 0)
        return 0;
    else if (grid[i][j + 1] == grid[i][j])
    {
        grid[i][j + 1] += grid[i][j];
        score += grid[i][j + 1];
    }
    else
        grid[i][j + 1] = grid[i][j];
    console.log("change " + grid[i][j]);
    grid[i][j] = 0;
    console.log("changed " + grid[i][j]);
    return 1;
}

function count_numbers_grid() {
    let num = 0;

    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size2; j ++) {
            if (grid[i][j] != 0)
                num ++;
        }
    }
    return num;
}

function check_numbers_grid(num) {
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size2; j ++) {
            if (grid[i][j] != 0)
                num --;
        }
    }
    return num;
}


function check_winner() {
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size2; j ++) {
            if (grid[i][j] >= 2048) {
                if (win != 1)
                {
                    win = 1;
                    if (window.confirm("You've won! Congratulations!, you now have two options, restart or keep playing to get the highest score possible.\n press ok to restart or close to continue.")) {
                        restart();
                    } else {
                        return 1;
                    }
                }
            }
        }
    }
}

function check_loser() {
    let checker = 0;
    
    for (let i = 0; i < size; i ++) {
        for (let j = 0; j < size2; j ++) {
            checker += strike_checker(i, j);
        }
    }
    if (checker >= size * size2) {
        if (win != -1)
            setTimeout(loser_message, 235);
        win = -1;
    }
}
function loser_message() {
    window.alert("You lost, there are no posible moves, better luck next time!\nYou got " + score + " score.");
}

function strike_checker(i, j) {
    let strikes = 0;

    if (grid[i][j] == 0)
        return 0;
    if (i != size - 1) {
        if (grid[i][j] != grid[i + 1][j]) {
            strikes ++;
        }
    } else {
        strikes ++;
    }
    if (j != size2 - 1) {
        if (grid[i][j] != grid[i][j + 1]) {
            strikes ++;
        }
    } else {
        strikes ++;
    }
    if (strikes == 2)
        return 1;
    else
        return 0;
}

function check_press(event) {
    console.log(event);
    if (onuse == 1)
        return (0);
    onuse = 1;
    if (event.key == 'w')
        up();
    else if (event.key =='a')
        left();
    else if (event.key == 's')
        down();
    else if (event.key == 'd')
        right();
    if (event.key == 'd' || event.key == 's' || event.key =='a' || event.key == 'w')
        addrandom(count_numbers_grid());
    load_score();
    setTimeout(refresh, 235);
 }

 function check_press_left() {
    if (onuse == 1)
        return (0);
    onuse = 1;
    console.log("hola");
    left();
    addrandom(count_numbers_grid());
    load_score();
    setTimeout(refresh, 235);
 }

 function check_press_up() {
    if (onuse == 1)
        return (0);
    onuse = 1;
    up();
    addrandom(count_numbers_grid());
    load_score();
    setTimeout(refresh, 235);
 }

 function check_press_down() {
    if (onuse == 1)
        return (0);
    onuse = 1;
    down();
    addrandom(count_numbers_grid());
    load_score();
    setTimeout(refresh, 235);
 }

 function check_press_right() {
    if (onuse == 1)
        return (0);
    onuse = 1;
    right();
    addrandom(count_numbers_grid());
    load_score();
    setTimeout(refresh, 235);
 }

function refresh() {
    fillgrid();
    onuse = 0;
    if (win == -1)
        restart();
    check_winner();
    check_loser();
}

function addrandom (adds) {
    let num2;
    let pos1;
    let pos2;

    if (adds + 1 > 16)
        return ;
    while (check_numbers_grid(adds + 1) > 0)
    {
        pos1 = get_random_int(size - 1);
        pos2 = get_random_int(size2 - 1);
        num2 = get_random_int(4);
        if (num2 < 2)
            num2 = 2;
        else
            num2 = 4;
        if (grid[pos1][pos2] == 0)
            grid[pos1][pos2] = num2;
    }
 }

function restart() {
    if (onuse == 1)
        return ;
    score = 0;
    win = 0;
    onuse = 1;
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    load_score();
    start();
 }
