export default class Cell {

  constructor(options) {
    this.value = options.value;
    this.isOpen = false;
    this.isOccupied = options.isOccupied;
    this.isFlagged = false;
    this.x = options.x;
    this.y = options.y;
  }

  open() {
    this.isOpen = true;
  }

  flag() {
    this.isFlagged = true;
  }

  unflag() {
    this.isFlagged = false;
  }

  toString() {
    return this.isOpen;
  }

}

