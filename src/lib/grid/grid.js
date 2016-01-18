import Cell from './cell';
import _ from 'lodash';

const initCells = (m, n, numberOccupied) => {
  const arr = [];
  const result = [];
  let perm = [];

  for (let i = 0; i < m * n; i++)
    perm.push(i);

  for (let i = 0; i < numberOccupied; i++) {
    let r = i + (Math.random() * (m * n - i) | 0);
    let t = perm[r];
    perm[r] = perm[i];
    perm[i] = t;
  }
  perm = perm.slice(0, numberOccupied);
  perm = perm.sort((x, y) => Number.parseInt(x) >= Number.parseInt(y) ? 1 : -1);

  let count = 0;
  let k = 0;
  for (let i = 0; i < m; i++) {
    arr.push([]);
    for (let j = 0; j < n; j++) {
      if (count === perm[k]) {
        arr[i][j] = true;
        k++;
      } else {
        arr[i][j] = false;
      }
      count++;
    }
  }

  const counted = arr.map((row, m) => {
    return row.map((cell, n) => {
      if (cell === true) return -1;
      return getEightWayNeighbors(arr, m, n)
        .map(point => point === true ? 1 : 0)
        .reduce((x, y) => x + y);
    });
  });

  for (let i = 0; i < m; i++) {
    result.push([]);
    for (let j = 0; j < n; j++) {
      result[i][j] = new Cell({
        value: counted[i][j],
        isOccupied: arr[i][j],
        x: i,
        y: j
      });
    }
  }

  return result;

};

const checkFlagged = (cells) => {
  const is = [];
  cells.forEach(row => {
    row.forEach(cell => {
      if (cell.isFlagged && cell.isOccupied) is.push(true);
      if (cell.isFlagged && !cell.isOccupied) is.push(false);
      if (cell.isOccupied && !cell.isFlagged) is.push(false);
    });
  });
  return is.reduce((x, y) => x && y);
};

const checkOpen = (cells) => {
  const is = [];
  cells.forEach(row => {
    row.forEach(cell => {
      if (!cell.isOpen && !cell.isOccupied) is.push(false);
      if (!cell.isOpen && cell.isOccupied) is.push(true);
    });
  });
  return is.reduce((x, y) => x && y);
};

export default class Grid {

  constructor(m, n, numberOccupied) {
    this.init(...arguments);
  }

  init(m, n, numberOccupied) {
    this.m = m;
    this.n = n;
    this.cells = initCells(m, n, numberOccupied);
    this.countOccupied = numberOccupied;
    this.flaggedCorrectly = false;
    this.openedCorrectly = false;
    this.countFlagged = 0;
    this.countCells = m * n;
    this.firstOpen = false;
  }

  toString() {
    let str = '\n';
    this.cells.forEach(row => {
      row.forEach(cell => {
        str += cell.toString() + '\t';
      });
      str += '\n';
    });
    return str;
  }

  flag(x, y) {
    if (this.countCells === this.countFlagged) return;
    this.cells[x][y].flag();
    this.countFlagged++;
    this.flaggedCorrectly = checkFlagged(this.cells);
    return _.clone(this, true);
  }

  unflag(x, y) {
    if (this.countFlagged === 0) return;
    this.cells[x][y].unflag();
    this.countFlagged--;
    this.flaggedCorrectly = checkFlagged(this.cells);
    return _.clone(this, true);
  }

  open(x, y) {
    const cell = this.cells[x][y];

    if (cell.isOpen) return this;
    if (!this.firstOpen) this.firstOpen = true;
    if (cell.value === 0) floodFill(this.cells, x, y);
    else cell.open();
    this.openedCorrectly = checkOpen(this.cells);
    return _.clone(this, true);
  }

  changeGrid(m, n, occupied) {
    this.init(m, n, occupied);
    return _.clone(this, true);
  }

  changeOccupied(n) {
    this.init(this.m, this.n, n);
    return _.clone(this, true);
  }

  new(m, n, countOccupied) {
    this.init(...arguments);
    return _.clone(this, true);
  }

}

function floodFill(arr, x, y) {
  if (isOverBoundary(arr, x, y)) return;
  if (arr[x][y].isOpen) return;
  if (arr[x][y].value !== 0) {
    const neighbors = getEightWayNeighbors(arr, x, y);
    if (neighbors.some(neighbor => neighbor.isOpen && neighbor.value === 0))
      arr[x][y].open();
    return;
  }
  arr[x][y].open();
  floodFill(arr, x + 1, y);
  floodFill(arr, x - 1, y);
  floodFill(arr, x, y - 1);
  floodFill(arr, x, y + 1);
  floodFill(arr, x - 1, y + 1);
  floodFill(arr, x + 1, y + 1);
  floodFill(arr, x + 1, y - 1);
  floodFill(arr, x - 1, y - 1);
  return;
}

function isOverBoundary(arr, x, y) {
  if (x < 0 || y < 0) return true;
  if (x >= arr.length || y >= arr[0].length) return true;
  return false;
}

function getFourWayNeighbors(arr, x, y) {
  const result = [];
  if (!isOverBoundary(arr, x + 1, y)) result.push(arr[x + 1][y]);
  if (!isOverBoundary(arr, x - 1, y)) result.push(arr[x - 1][y]);
  if (!isOverBoundary(arr, x, y - 1)) result.push(arr[x][y - 1]);
  if (!isOverBoundary(arr, x, y + 1)) result.push(arr[x][y + 1]);
  return result;
}

function getEightWayNeighbors(arr, x, y) {
  const result = [];
  if (!isOverBoundary(arr, x - 1, y)) result.push(arr[x - 1][y]);
  if (!isOverBoundary(arr, x - 1, y + 1)) result.push(arr[x - 1][y + 1]);
  if (!isOverBoundary(arr, x, y + 1)) result.push(arr[x][y + 1]);
  if (!isOverBoundary(arr, x + 1, y + 1)) result.push(arr[x + 1][y + 1]);
  if (!isOverBoundary(arr, x + 1, y)) result.push(arr[x + 1][y]);
  if (!isOverBoundary(arr, x + 1, y - 1)) result.push(arr[x + 1][y - 1]);
  if (!isOverBoundary(arr, x, y - 1)) result.push(arr[x][y - 1]);
  if (!isOverBoundary(arr, x - 1, y - 1)) result.push(arr[x - 1][y - 1]);
  return result;
}

