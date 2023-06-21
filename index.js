import fs from 'fs';
const file_name = './data/file14';
const large_file_name = './data/fileLarge14';
const lines = fs.readFileSync(large_file_name, 'utf-8').split('\r\n').values();

/*
!day14
const BOARD_SIZE = 1000;
const task = 2;
let sandTotalAmount = 0;
let lowestRockPos = 0;

const makeBoard = () => {
    const board = Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = Array(BOARD_SIZE).fill('.');
    }
    return board;
};
const putRocks = () => {
    for (const line of lines) {
        const positions = line.split(' -> ');
        for (let i = 0; i < positions.length - 1; i++) {
            const point = positions[i].split(',');
            const pointNext = positions[i + 1].split(',');
            const x = Number(point[0]);
            const y = Number(point[1]);
            const xNext = Number(pointNext[0]);
            const yNext = Number(pointNext[1]);
            lowestRockPos = Math.max(lowestRockPos, y, yNext);
            if (x < xNext) {
                for (let pos = x; pos <= xNext; pos++) {
                    board[y][pos] = '#';
                }
            }
            if (x > xNext) {
                for (let pos = x; pos >= xNext; pos--) {
                    board[y][pos] = '#';
                }
            }
            if (y < yNext) {
                for (let pos = y; pos <= yNext; pos++) {
                    board[pos][x] = '#';
                }
            }
            if (y > yNext) {
                for (let pos = y; pos >= yNext; pos--) {
                    board[pos][x] = '#';
                }
            }
        }
    }
    if (task === 2) board[(lowestRockPos += 2)] = '#'.repeat(BOARD_SIZE);
};
const drawBoard = (limit = BOARD_SIZE) => {
    for (let y = 0; y < limit; y++) {
        let row = '';
        for (let x = 0; x < BOARD_SIZE; x++) {
            row += board[y][x];
        }
        console.log(row);
    }
    console.log('='.repeat(BOARD_SIZE));
};
const isEmpty = (x, y) => {
    if (board[y][x] === '.') return true;
    return false;
};
const isTotallyBlocked = (x, y) => {
    if (
        !isEmpty(x, y + 1) &&
        !isEmpty(x - 1, y + 1) &&
        !isEmpty(x + 1, y + 1)
    ) {
        return true;
    }
    return false;
};
const canPutSand = () => {
    let sandPos = [500, 0];
    if (task === 2 && isTotallyBlocked(...sandPos)) {
        board[sandPos[1]][sandPos[0]] = 'o';
        sandTotalAmount++;
        return false;
    }
    while (sandPos[1] < lowestRockPos) {
        const x = sandPos[0];
        const y = sandPos[1];
        if (isEmpty(x, y + 1)) {
            sandPos = [x, y + 1];
            continue;
        }
        if (isEmpty(x - 1, y + 1)) {
            sandPos = [x - 1, y + 1];
            continue;
        }
        if (isEmpty(x + 1, y + 1)) {
            sandPos = [x + 1, y + 1];
            continue;
        }
        board[sandPos[1]][sandPos[0]] = 'o';
        sandTotalAmount++;
        return true;
    }
    return false;
};
const board = makeBoard();
putRocks();
while (canPutSand()) {}
console.log('total of sands=', sandTotalAmount);
//1
const BOARD_SIZE = 200;
const horizontalOffset = 400;
let sandTotalAmount = 0;
let lowestRockPos = 0;
const board = Array(BOARD_SIZE);
for (let i = 0; i < BOARD_SIZE; i++) {
    board[i] = Array(BOARD_SIZE).fill('.');
}

const putRocks = () => {
    for (const line of lines) {
        const positions = line.split(' -> ');
        for (let i = 0; i < positions.length - 1; i++) {
            const point = positions[i].split(',');
            const pointNext = positions[i + 1].split(',');
            const x = Number(point[0]) - horizontalOffset;
            const y = Number(point[1]);
            const xNext = Number(pointNext[0]) - horizontalOffset;
            const yNext = Number(pointNext[1]);
            lowestRockPos = Math.max(lowestRockPos, y, yNext);
            if (x < xNext) {
                for (let pos = x; pos <= xNext; pos++) {
                    board[y][pos] = '#';
                }
            }
            if (x > xNext) {
                for (let pos = x; pos >= xNext; pos--) {
                    board[y][pos] = '#';
                }
            }
            if (y < yNext) {
                for (let pos = y; pos <= yNext; pos++) {
                    board[pos][x] = '#';
                }
            }
            if (y > yNext) {
                for (let pos = y; pos >= yNext; pos--) {
                    board[pos][x] = '#';
                }
            }
        }
    }
};
const drawBoard = (limit = BOARD_SIZE) => {
    for (let y = 0; y < limit; y++) {
        let row = '';
        for (let x = 0; x < BOARD_SIZE; x++) {
            row += board[y][x];
        }
        console.log(row);
    }
    console.log('='.repeat(BOARD_SIZE));
};
const isEmpty = (x, y) => {
    if (board[y][x] === '.') return true;
    return false;
};
const canPutSand = () => {
    let sandPos = [500 - horizontalOffset, 0];
    while (sandPos[1] < lowestRockPos) {
        const x = sandPos[0];
        const y = sandPos[1];
        if (isEmpty(x, y + 1)) {
            sandPos = [x, y + 1];
            continue;
        }
        if (isEmpty(x - 1, y + 1)) {
            sandPos = [x - 1, y + 1];
            continue;
        }
        if (isEmpty(x + 1, y + 1)) {
            sandPos = [x + 1, y + 1];
            continue;
        }
        board[sandPos[1]][sandPos[0]] = 'o';
        sandTotalAmount++;
        return true;
    }
    return false;
};
putRocks();
drawBoard();
while (canPutSand()) {}
drawBoard();
console.log('total of sands=', sandTotalAmount);
!day13 unfinished
function compare(str1, str2) {
    let len = Math.max(str1.length, str2.length);
    let j = 1;
    let i = 1;
    for (; i < len && j < len; ) {
        if (str1[i] === '[' || str1[i] === ',') {
            i++;
        }
        if (str2[j] === '[' || str2[j] === ',') {
            j++;
        }
        const char1 = str1[i];
        const char2 = str2[j];
        if (char1 === '3') {
            // console.log('x');
        }
        if (!char1 && char2) return false;
        let num1 = Number(char1);
        let num2 = Number(char2);
        if (!isNaN(num1) && !isNaN(num2)) {
            if (num1 === 1 && str1[i + 1] === '0') {
                num1 = 10;
                i++;
            }
            if (num2 === 1 && str2[j + 1] === '0') {
                num2 = 10;
                j++;
            }
            if (num1 > num2) return false;
            if (num1 < num2) return true;
        }
        if (char1 === char2) {
            i++;
            j++;
            continue;
        }
        if (char1 === ']' && char2 !== ']') return true;
        if (char1 !== ']' && char2 === ']') return false;
    }
    return false;
}
function checkAll() {
    let count = 0;
    let i = 1;
    while (true) {
        let line1 = lines.next();
        if (line1.value === '[[],[0,4,[[2,9,0,1,2],[1,1,1,1],9,[2]]],[[],5]]') {
            console.log('x');
        }
        if (line1.done) {
            break;
        }
        let line2 = lines.next();
        if (compare(line1.value, line2.value)) {
            count += i;
        }
        i++;
        lines.next();
    }
    console.log(count);
}
checkAll();
!day11
const GIVEN_TASK = 2; //1
const CYCLES = 10000; //20
const lines = fs.readFileSync(large_file_name, 'utf-8').split('\r\n');

class Monkey {
  items = [];
  inspectedItems = 0;
  constructor({
    name,
    items,
    operator,
    multiplier,
    divider,
    monkeyThrowNames,
  }) {
    this.name = name;
    this.divider = Number(divider);
    this.items = items.map((item) =>
      item.includes(',') ? Number(item.slice(0, item.length - 1)) : Number(item)
    );
    this.operate = () => {
      const item = this.items.shift();
      const arg = multiplier === 'old' ? item : Number(multiplier);
      const newItem = operator === '+' ? item + arg : item * arg;
      this.inspectedItems++;
      return newItem;
    };
    this.throw = (item) => {
      const newItem = this.reduceItem(item);
      const firstMonkey = Monkeys[monkeyThrowNames[0]];
      const secondMonkey = Monkeys[monkeyThrowNames[1]];
      newItem % this.divider === 0
        ? firstMonkey.catch(newItem)
        : secondMonkey.catch(newItem);
    };
  }
  reduceItem(item) {
    return GIVEN_TASK === 1
      ? Math.floor(item / 3)
      : Math.floor(item % commonDivider);
  }
  catch(item) {
    this.items.push(item);
  }
  workWithItems() {
    while (this.items.length !== 0) {
      const operated = this.operate();
      this.throw(operated);
    }
  }
}
const makeMonkeys = () => {
  let monkeyConfig = {};
  const line = lines.values();
  const getArgs = (line) => {
    return line.next().value.trim().split(' ');
  };
  while (true) {
    let temp = line.next();
    if (temp.done) {
      return;
    }
    let args = temp.value.trim().split(' ');
    monkeyConfig.name = Number(args[1][0]);

    args = getArgs(line);
    monkeyConfig.items = args.splice(2);

    args = getArgs(line);
    monkeyConfig.operator = args[4];
    monkeyConfig.multiplier = args[5];

    args = getArgs(line);
    monkeyConfig.divider = args[3];

    monkeyConfig.monkeyThrowNames = [];
    args = getArgs(line);
    monkeyConfig.monkeyThrowNames.push(Number(args[5]));
    args = getArgs(line);
    monkeyConfig.monkeyThrowNames.push(Number(args[5]));

    line.next(); // get empty line
    Monkeys.push(new Monkey(monkeyConfig));
  }
};
const getMaxMultiplied = () => {
  const inspeced = Monkeys.map((monkey) => monkey.inspectedItems);
  const first = Math.max(...inspeced);
  const second = Math.max(...inspeced.filter((value) => value !== first));
  return first * second;
};

const Monkeys = [];
makeMonkeys(GIVEN_TASK);
const commonDivider = Monkeys.reduce(
  (commonDivider, monkey) => commonDivider * monkey.divider,
  1
);
for (let i = 0; i < CYCLES; i++) {
  for (let monkey of Monkeys) {
    monkey.workWithItems();
  }
}
console.log(getMaxMultiplied());
!day9

class PlanckParticleGame {
  headPos = [0, 0];
  tailPos = [0, 0];
  tailPositions = new Set().add('0,0');
  isNear() {
    if (
      this.headPos[0] <= this.tailPos[0] + 1 &&
      this.headPos[0] >= this.tailPos[0] - 1 &&
      this.headPos[1] <= this.tailPos[1] + 1 &&
      this.headPos[1] >= this.tailPos[1] - 1
    ) {
      return true;
    }
    return false;
  }
  moveParticle(dir, length) {
    const len = Number(length);
    for (let i = 0; i < len; i++) {
      const lastHeadPos = [...this.headPos];
      switch (dir) {
        case 'R':
          this.headPos[0]++;
          break;
        case 'L':
          this.headPos[0]--;
          break;
        case 'U':
          this.headPos[1]++;
          break;
        case 'D':
          this.headPos[1]--;
      }
      if (!this.isNear()) {
        this.tailPos = lastHeadPos;
        this.tailPositions.add(this.tailPos[0] + ',' + this.tailPos[1]);
      }
    }
  }
  solution() {
    for (const command of lines) {
      const args = command.split(' ');
      this.moveParticle(args[0], args[1]);
    }
    console.log(this.tailPositions.size);
  }
}

new PlanckParticleGame().solution();

!day10
class Machine2 {
  crt = 1;
  eax = 1;
  crtDisplay = '';
  incrementCycle() {
    this.crtDisplay +=
      this.crt <= this.eax + 2 && this.crt >= this.eax ? '#' : '.';
    this.crt++;
    if (this.crt % 41 === 0) {
      this.crt = 1;
      this.crtDisplay += '\n';
    }
  }
  addX(number) {
    this.incrementCycle();
    this.incrementCycle();
    this.eax += Number(number);
  }
  solution() {
    for (let command of commands) {
      const subCommands = command.split(' ');
      switch (subCommands[0]) {
        case 'addx':
          this.addX(subCommands[1]);
          break;
        case 'noop':
          this.incrementCycle();
          break;
      }
    }
    console.log(this.crtDisplay);
  }
}
class Machine1 {
  signalStrengths = Array(Math.ceil((commands.length - 19) / 40));
  cycle = 1;
  eax = 1;
  signalStrengthsIndex = 0;
  incrementCycle() {
    this.cycle++;
    if ((this.cycle - 20) % 40 === 0) {
      this.signalStrengths[this.signalStrengthsIndex++] = this.cycle * this.eax;
    }
  }
  addX(number) {
    this.incrementCycle();
    this.eax += Number(number);
  }
  solution1() {
    for (let command of commands) {
      const subCommands = command.split(' ');
      switch (subCommands[0]) {
        case 'addx':
          this.addX(subCommands[1]);
        case 'noop':
          this.incrementCycle();
          break;
      }
    }
    console.log(this.signalStrengths.reduce((sum, value) => (sum += value), 0));
  }
}
new Machine1().solution1();

!day8
const rows = treeRows.length;
const columns = treeRows[0].length;

const trees = [];
const calcScore = (x, y) => {
  const tree = { score: 1 };
  let score = 0;
  for (let right = x + 1; right < columns; right++) {
    score++;
    if (treeRows[y][right] >= treeRows[y][x]) break;
  }
  tree.score *= score;
  score = 0;

  for (let bottom = y + 1; bottom < rows; bottom++) {
    score++;
    if (treeRows[bottom][x] >= treeRows[y][x]) break;
  }
  tree.score *= score;
  score = 0;
  for (let left = x - 1; left >= 0; left--) {
    score++;
    if (treeRows[y][left] >= treeRows[y][x]) break;
  }
  tree.score *= score;
  score = 0;
  for (let top = y - 1; top >= 0; top--) {
    score++;
    if (treeRows[top][x] >= treeRows[y][x]) break;
  }
  tree.score *= score;

  trees.push(tree);
};
for (let x = 1; x < treeRows[0].length - 1; x++) {
  for (let y = 1; y < treeRows.length - 1; y++) {
    calcScore(x, y);
  }
}
console.log(Math.max(...trees.map((tree) => tree.score)));


const dirs = { left: 'left', bottom: 'bot', top: 'top', right: 'right' };

const isVisible = (x, y, dir) => {
  if (dir === dirs.top) {
    let axis = y - 1;
    while (axis >= 0) {
      if (treeRows[y][x] <= treeRows[axis--][x]) {
        return false;
      }
    }
    return true;
  }
  if (dir === dirs.left) {
    let axis = x - 1;
    while (axis >= 0) {
      if (treeRows[y][x] <= treeRows[y][axis--]) {
        return false;
      }
    }
    return true;
  }
  if (dir === dirs.bottom) {
    let axis = y + 1;
    while (axis < rows) {
      if (treeRows[y][x] <= treeRows[axis++][x]) {
        return false;
      }
    }
    return true;
  }
  if (dir === dirs.right) {
    let axis = x + 1;
    while (axis < columns) {
      if (treeRows[y][x] <= treeRows[y][axis++]) {
        return false;
      }
    }
    return true;
  }
  throw BADNAME;
};

const order = [dirs.left, dirs.top, dirs.right, dirs.bottom];
const ex1 = () => {
  const edgeVisibleTrees = rows * columns - (rows - 2) * (columns - 2);
  let innerVisibleTrees = 0;
  for (let x = 1; x < treeRows[0].length - 1; x++) {
    for (let y = 1; y < treeRows.length - 1; y++) {
      for (let dir of order) {
        if (isVisible(x, y, dir)) {
          innerVisibleTrees++;
          break;
        }
      }
    }
  }
  return innerVisibleTrees + edgeVisibleTrees;
};
!day7 FAIL
const makeRootDir = (lines) => {
  const rootDir = { type: 'dir', dirName: '/' };
  let currentDir = rootDir;
  for (let line of lines) {
    const args = line.split(' ');
    switch (args[0]) {
      case '$':
        if (args[1] === 'cd') {
          if (args[2] !== '/' && args[2] !== '..') {
            currentDir[args[2]] = {
              '..': currentDir,
              type: 'dir',
              dirName: args[2],
            };
            currentDir = currentDir[args[2]];
          }
          if (args[2] === '..') {
            currentDir = currentDir['..'];
          }
        }
        break;
      case 'dir':
        currentDir[args[1]] = {
          '..': currentDir,
          type: 'dir',
          dirName: args[1],
        };
        break;
      default:
        currentDir[args[1]] = { size: Number(args[0]), type: 'file' };
    }
  }
  return rootDir;
};

const countFiles = (rootDir) => {
  let fileSizes = 0;
  const dirs = [rootDir];
  const dirsSizes = [];
  const addFiles = (root) => {
    if (root.type === 'dir') {
      if (!dirs.find((dir) => dir.dirName === root.dirName)) {
        dirs.push(root);
      }
      Object.entries(root).forEach(([key, value]) => {
        if (value === 'dir') if (key === '..' || key === 'dirName') return 0;
        fileSizes += addFiles(value);
      });
    }
    if (root.type === 'file') return root.size;
    return 0;
  };
  for (let dir of dirs) {
    addFiles(dir);
    dirsSizes.push(fileSizes);
    fileSizes = 0;
  }
  console.log(dirs.map((dirs) => dirs.dirName));
  console.log(dirsSizes);
};

const rootDir = makeRootDir(lines);
console.log(rootDir);
countFiles(rootDir);

!day6

const signalStarts = [];
const offset = 4;
for (const line of lines) {
  let startSignalIndex = 0;
  while (line.length > startSignalIndex) {
    const signal = new Set(
      line.slice(startSignalIndex, startSignalIndex + offset)
    );
    if (signal.size === offset) {
      signalStarts.push(startSignalIndex + offset);
      break;
    }
    startSignalIndex++;
  }
}
console.log(signalStarts);
!day5
const lines = fs.readFileSync(large_file_name).toString().split('\r\n');
const stacks = Array(Math.ceil(lines[0].length / 4)).fill([]);
const moves = [];
let isCommands = false;
const isAlpha = function (ch) {
  return (
    typeof ch === 'string' &&
    ch.length === 1 &&
    ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))
  );
};
for (let line of lines) {
  if (line === '') isCommands = true;
  if (!isCommands) {
    for (let i = 1; i < line.length; i += 4) {
      if (line[i] !== ' ' && isAlpha(line[i])) {
        const stackIndex = Math.floor(i / 4);
        stacks[stackIndex] = [line[i], ...stacks[stackIndex]];
        // console.log(i, line[i], Math.floor(i / 4), stacks[Math.floor(i /
4)]);
      }
    }
  } else if (line !== '') {
    moves.push(
      line
        .split(' ')
        .filter((_, i) => i % 2)
        .map((move) => Number(move))
    );
  }
}

for (const move of moves) {
  for (let i = 0; i < move[0]; i++) {
    const crate = stacks[move[1] - 1].pop();
    stacks[move[2] - 1].push(crate);
  }
}

// quest2
for (const move of moves) {
  const takeStack = stacks[move[1] - 1];
  const pushStack = stacks[move[2] - 1];
  const crateAmount = move[0];
  let tempStack = takeStack.splice(takeStack.length - crateAmount, crateAmount);
  pushStack.push(...tempStack);
}

console.log(stacks.map((stack) => stack[stack.length - 1]).join(''));
!day4
const sectors = file_content
  .toString()
  .split('\r\n')
  .flatMap((value) => value.split(','))
  .flatMap((value) => value.split('-'))
  .map((value) => Number(value));
let count = 0;
for (let i = 0; i < sectors.length; i += 4)
  if (
    (sectors[i + 0] <= sectors[i + 2] && sectors[i + 1] >= sectors[i + 2]) ||
    (sectors[i + 0] <= sectors[i + 3] && sectors[i + 1] >= sectors[i + 2])
  ) {
    count++;
  }
console.log('count', count);

fs.readFile(large_file_name, (err, data) => {
  const lines = data.toString().split('\r\n');
  const sections = lines
    .flatMap((pair) => pair.split(','))
    .flatMap((section) => section.split('-'))
    // Don't compare strings!!!
    .map((number) => Number(number));
  let count = 0;
  for (let i = 0; i < sections.length; i += 4) {
    if (
      (sections[0 + i] <= sections[2 + i] &&
        sections[1 + i] >= sections[3 + i]) ||
      (sections[0 + i] >= sections[2 + i] && sections[1 + i] <= sections[3 + i])
    ) {
      count++;
    }
  }
  console.log(count);
});
!day3
  const strings = data.toString().split('\r\n');
  const offset = 96;
  const bigLetterOffset = 58;
  let sum = 0;
  for (let i = 0; i < strings.length; i += 3) {
    const bags = strings.slice(i, i + 3);
    let duplicatedChar;
    for (const char of bags[0]) {
      if (bags[1].includes(char) && bags[2].includes(char))
        duplicatedChar = char;
    }
    let value = duplicatedChar.charCodeAt() - offset;
    sum += value < 0 ? value + bigLetterOffset : value;
  }
  console.log(sum);

  const offset = 96;
  const bigLetterOffset = 58;
  let sum = 0;
  for (const line of strings) {
    const halfed = [
      line.slice(0, line.length / 2),
      line.slice(line.length / 2),
    ];
    let duplicatedChar;
    for (const charFirst of halfed[0]) {
      if (halfed[1].includes(charFirst)) {
        duplicatedChar = charFirst;
        break;
      }
    }
    const value = duplicatedChar.charCodeAt() - offset;
    const prevSum = sum;
    sum += value < 0 ? value + bigLetterOffset : value;
  }
  console.log(sum);
!day2
  const strats = data.toString().split('\r\n');
  const points = {
    rock: 1,
    paper: 2,
    scissors: 3,
    lose: 0,
    draw: 3,
    win: 6,
    total: 0,
  };
  const offset = 88;
  for (const round of strats) {
    let opponentPick = round[0].charCodeAt();
    let result = round[2].charCodeAt() - offset;
    switch (result) {
      case 0:
        points.total += points.lose;
        break;
      case 1:
        points.total += points.draw;
        break;
      case 2:
        points.total += points.win;
    }
    if ((opponentPick + result) % 3 === 0) points.total += points.rock;
    if ((opponentPick + result) % 3 === 1) points.total += points.paper;
    if ((opponentPick + result) % 3 === 2) points.total += points.scissors;
  }
  console.log(points.total);

  const points = {
    rock: 1,
    paper: 2,
    scissors: 3,
    lose: 0,
    draw: 3,
    win: 6,
    total: 0,
  };
  const offset = 23;
  for (const round of strats) {
    let opponentPick = round[0].charCodeAt();
    let playerPick = round[2].charCodeAt();
    if (playerPick - offset === opponentPick) points.total += points.draw;
    if (
      playerPick - offset - 1 === opponentPick ||
      playerPick - offset + 2 === opponentPick
    ) {
      points.total += points.win;
    }
    if (
      playerPick - offset - 2 === opponentPick ||
      playerPick - offset + 1 === opponentPick
    ) {
      points.total += points.lose;
    }
    if (String.fromCharCode(playerPick) === 'X') points.total += points.rock;
    if (String.fromCharCode(playerPick) === 'Y') points.total += points.paper;
    if (String.fromCharCode(playerPick) === 'Z')
      points.total += points.scissors;
    // console.log(opponentPick, playerPick - offset, points.total - start);
  }
  console.log(points.total);

!day1
fs.readFile(large_file_name, (err, data) => {
  const bags = data.toString().split('\r\n');
  let currentAmount = 0;

  const bestElfes = bags.reduce(
    (bestElfes, bag, bag_index) => {
      currentAmount += Number(bag);
      if (!(bag === '' || bag_index === bags.length - 1)) return bestElfes;

      let index = bestElfes.findIndex((value) => value === 0);
      if (index === -1) {
        const smallestElf = Math.min(...bestElfes);
        if (smallestElf < currentAmount)
          index = bestElfes.findIndex((value) => value === smallestElf);
      }
      // console.log(index, currentAmount, bestElfes);
      if (index !== -1) bestElfes[index] = currentAmount;
      currentAmount = 0;
      return bestElfes;
    },
    [0, 0, 0]
  );
  console.log(bestElfes.reduce((sum, value) => (sum += value), 0));
});

!third
  let bestElf = { amount: 0, pos: 0 };
  const currentElf = { amount: 0, pos: 0 };
  for (const line of values) {
    if (line === '') {
      if (bestElf.amount < currentElf.amount) {
        bestElf = { ...currentElf };
      }
      currentElf.amount = 0;
      currentElf.pos++;
    }
    currentElf.amount += Number(line);
  }
  console.log(bestElf);
  !Second
  const elfs = values.reduce(
    (elfs, elf_bag, i) => {
      if (elf_bag === '') elfs.push(0);
      elfs[elfs.length - 1] += Number(elf_bag);
      return elfs;
    },
    [0]
  );
  console.log(elfs);

  !First
  elfes = [0]
  let currElf = 0;
  for (const line of values) {
    if (line === '') {
      elfs.push(0);
      currElf++;
    }
    elfs[currElf] += Number(line);
  }
  console.log(elfs.entries());
  console.log(Math.max(...elfs));

const getLongestAvailable = (optimalCuts, cutsTodo = [], length) => {
  //[3],[1,4,5],7
  optimalCuts = optimalCuts.sort();
  cutsTodo = cutsTodo.sort();
  let lastCut = 0;
  let min = length;
  for (let i = 0; i < length; i++) {
    let len = optimalCuts[i] - lastCut;
    if (len < min && cutsTodo.find((ct) => ct < optimalCuts[i])) {
      min = len;
    }
  }
  return min;
};
console.log(getLongestAvailable([3], [1, 4, 5], 7));

const getBestCut = (n, cuts) => {
  let optimal = Math.floor(cuts.length / 2);
  let best = cuts[0];
  let smallest = Math.abs(cuts[0] - optimal);
  for (let i = 0; i < cuts.length; i++) {
    if (smallest > Math.abs(cuts[i] - optimal)) {
      best = cuts[i];
      smallest = Math.abs(cuts[i] - optimal);
    }
  }
  return best;
};
let arr = [1, 3, 4, 5];
const optimal = [];
for (let i = 0; i < arr.length; i++) {
  optimal.push(getBestCut(7, arr));
  arr = arr.filter((value) => optimal.find((op) => op !== value));
  console.log(arr);
}
console.log(optimal);


const WARMUP_VALUE = 1000_000;
const PLAY_VALUE = 1000_000;
const WARMUPreturnOutOfFor = () => {
  let x = 0;
  for (let i = 1; i < WARMUP_VALUE; i++) {
    if (i % 99_000 === 0) {
      x = 5;
    }
    var a = i + i;
  }
  return x + a;
};
const WARMUPreturnInFor = () => {
  for (let i = 1; i < WARMUP_VALUE; i++) {
    if (i % 99_000 === 0) {
      return 5;
    }
    var a = i + i;
  }
  return 0 + a;
};

const returnInFor = () => {
  for (let i = 1; i < PLAY_VALUE; i++) {
    if (i % 99_000 === 0) {
      return 5;
    }
  }
  return 0 + a;
};

const returnOutOfFor = () => {
  let x = 0;
  for (let i = 1; i < PLAY_VALUE; i++) {
    if (i % 99_000 === 0) {
      x = 5;
    }
  }
  return x;
};

const returnOutOfForWeird1 = () => {
  let x = 0;
  let i;
  for (i = 1; i < PLAY_VALUE; i++) {
    if (i % 99_000 === 0) {
      x = 5;
    }
  }
  return x;
};

const returnOutOfForWeird2 = () => {
  let x = 0;
  let i = 1;
  for (i; i < PLAY_VALUE; ) {
    if (i % 99_000 === 0) {
      x = 5;
    }
    i++;
  }
  return x;
};

const returnInWhile = () => {
  let i = 1;
  while (i < PLAY_VALUE) {
    if (i % 99_000 === 0) {
      return 5;
    }
    i++;
  }
  return 0;
};

const returnOutOfWhile = () => {
  let x = 0;
  let i = 1;
  while (i < PLAY_VALUE) {
    if (i % 99_000 === 0) {
      x = 5;
    }
    i++;
  }
  return x;
};

WARMUPreturnOutOfFor();
WARMUPreturnInFor();

console.time("returnInFor");
returnInFor();
console.timeEnd("returnInFor");

console.time("returnOutFor");
returnOutOfFor();
console.timeEnd("returnOutFor");

console.time("returnInWhile");
returnInWhile();
console.timeEnd("returnInWhile");

console.time("returnOutWhile");
returnOutOfWhile();
console.timeEnd("returnOutWhile");

console.time("returnOutOfForWeird1");
returnOutOfForWeird1();
console.timeEnd("returnOutOfForWeird1");

console.time("returnOutOfForWeird2");
returnOutOfForWeird2();
console.timeEnd("returnOutOfForWeird2");
*/
// console.time("abr");
// let arr = [1,2,3];
// arr[100]=99;
// console.timeEnd("abr");

// console.time("shory");
// let arr2 = [1,2,3];
// While(let i = 3;i <100;i++){
// 	arr2[i] = undefined;
// }
// arr2[100]=99;
// console.timeEnd("shory")

// console.time("preset");
// let arr3 = new Array(101);
// arr3[0]=1;
// arr3[1]=2;
// arr3[2]=3;
// arr[100]=99;
// console.timeEnd("preset");

// const addTwoNumber=> {
//   return a + b;
// };

// console.log(addTwoNumber("2",5n));
