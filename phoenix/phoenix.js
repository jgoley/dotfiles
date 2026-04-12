// -----------------------------------------
// Modifier Key Groups
// -----------------------------------------

const hyper = ['cmd', 'alt', 'ctrl', 'shift'];
const semiHyper = ['cmd', 'alt'];
const appMash = ['cmd', 'alt', 'ctrl'];

// -----------------------------------------
// Config
// -----------------------------------------

const MARGIN_X = 5;
const MARGIN_Y = 5;
let GRID_WIDTH = 10;
let lastWindowFrame = null;

// -----------------------------------------
// Utilities
// -----------------------------------------

const showModal = function (message, duration) {
  const modal = new Modal();
  modal.message = message;
  modal.duration = duration || 2;
  return modal.show();
};

// -----------------------------------------
// Grid
// -----------------------------------------

const changeGridWidth = function (amount) {
  GRID_WIDTH = Math.max(1, GRID_WIDTH + amount);
  Phoenix.notify(`Grid is now ${GRID_WIDTH} tiles wide`);
  Window.all({ visible: true }).forEach(win => win.snapToGrid());
};

const expandRight = function () {
  const win = Window.focused();
  const f = win.getGrid();
  if ((f.w === (GRID_WIDTH - f.x)) && (f.x !== 0)) {
    ++f.w;
    --f.x;
  } else {
    f.w = Math.min(f.w + 1, GRID_WIDTH - f.x);
  }
  win.setGrid(f, win.screen());
};

Window.prototype.getGrid = function () {
  const winFrame = this.frame();
  const screen = this.screen().flippedVisibleFrame();
  const colWidth = screen.width / GRID_WIDTH;
  const rowHeight = screen.height / 2;

  return {
    x: Math.round((winFrame.x - screen.x) / colWidth),
    y: Math.round((winFrame.y - screen.y) / rowHeight),
    w: Math.max(1, Math.round(winFrame.width / colWidth)),
    h: Math.max(1, Math.round(winFrame.height / rowHeight))
  };
};

Window.prototype.setGrid = function (grid, screen) {
  lastWindowFrame = { win: this, frame: this.frame() };
  const screenFrame = screen.flippedVisibleFrame();
  const colWidth = screenFrame.width / GRID_WIDTH;
  const rowHeight = screenFrame.height / 2;
  return this.setFrame({
    x: screenFrame.x + (grid.x * colWidth) + MARGIN_X,
    y: screenFrame.y + (grid.y * rowHeight) + MARGIN_Y,
    width: (grid.w * colWidth) - (MARGIN_X * 2),
    height: (grid.h * rowHeight) - (MARGIN_Y * 2)
  });
};

Window.prototype.snapToGrid = function () {
  if (this.isNormal()) {
    this.setGrid(this.getGrid(), this.screen());
  }
};

// -----------------------------------------
// Grid Key Bindings
// -----------------------------------------

// Increase columns in grid
Key.on('=', hyper, () => changeGridWidth(+1));

// Decrease columns in grid
Key.on('-', hyper, () => changeGridWidth(-1));

// Snap focused window to grid
Key.on(';', hyper, () => Window.focused().snapToGrid());

// Snap all windows to grid
Key.on("'", hyper, () => Window.all({ visible: true }).forEach(win => win.snapToGrid()));

// -----------------------------------------
// Window Focus
// -----------------------------------------

// Focus closest window to the left
Key.on('left', hyper, () => Window.focused().focusClosestNeighbour('west'));

// Focus closest window to the right
Key.on('right', hyper, () => Window.focused().focusClosestNeighbour('east'));

// Focus closest window above
Key.on('up', hyper, () => Window.focused().focusClosestNeighbour('north'));

// Focus closest window below
Key.on('down', hyper, () => Window.focused().focusClosestNeighbour('south'));

// -----------------------------------------
// Window Position
// -----------------------------------------

// Move to previous screen
Key.on('p', hyper, function () {
  const win = Window.focused();
  win.setGrid(win.getGrid(), win.screen().previous());
});

// Move to next screen
Key.on('\\', hyper, function () {
  const win = Window.focused();
  win.setGrid(win.getGrid(), win.screen().next());
});

// Move to lower half of screen
Key.on('j', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.y = 1;
  f.h = 1;
  win.setGrid(f, win.screen());
});

// Move to upper half of screen
Key.on('k', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.y = 0;
  f.h = 1;
  win.setGrid(f, win.screen());
});

// Move to top-left quarter
Key.on('1', hyper, function () {
  const win = Window.focused();
  win.setGrid({ x: 0, y: 0, w: Math.ceil(GRID_WIDTH / 2), h: 1 }, win.screen());
});

// Move to top-right quarter
Key.on('2', hyper, function () {
  const win = Window.focused();
  const half = Math.floor(GRID_WIDTH / 2);
  win.setGrid({ x: half, y: 0, w: GRID_WIDTH - half, h: 1 }, win.screen());
});

// Move to bottom-left quarter
Key.on('3', hyper, function () {
  const win = Window.focused();
  win.setGrid({ x: 0, y: 1, w: Math.ceil(GRID_WIDTH / 2), h: 1 }, win.screen());
});

// Move to bottom-right quarter
Key.on('4', hyper, function () {
  const win = Window.focused();
  const half = Math.floor(GRID_WIDTH / 2);
  win.setGrid({ x: half, y: 1, w: GRID_WIDTH - half, h: 1 }, win.screen());
});

// Snap to left third
Key.on('5', hyper, function () {
  const win = Window.focused();
  const third = Math.floor(GRID_WIDTH / 3);
  win.setGrid({ x: 0, y: 0, w: third, h: 2 }, win.screen());
});

// Snap to center third
Key.on('6', hyper, function () {
  const win = Window.focused();
  const third = Math.floor(GRID_WIDTH / 3);
  win.setGrid({ x: third, y: 0, w: third, h: 2 }, win.screen());
});

// Snap to right third
Key.on('7', hyper, function () {
  const win = Window.focused();
  const third = Math.floor(GRID_WIDTH / 3);
  win.setGrid({ x: third * 2, y: 0, w: GRID_WIDTH - (third * 2), h: 2 }, win.screen());
});

// Center active window on screen
Key.on('return', hyper, function () {
  const win = Window.focused();
  const winFrame = win.frame();
  const screenFrame = win.screen().flippedVisibleFrame();
  win.setFrame({
    x: screenFrame.x + (screenFrame.width - winFrame.width) / 2,
    y: screenFrame.y + (screenFrame.height - winFrame.height) / 2,
    width: winFrame.width,
    height: winFrame.height
  });
});

// Move to far eastern side of screen
Key.on(']', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.x = GRID_WIDTH - f.w;
  win.setGrid(f, win.screen());
});

// Move to far western side of screen
Key.on('[', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.x = 0;
  win.setGrid(f, win.screen());
});

// Resize focused window and the next window to 50% width, side by side
Key.on('n', hyper, function () {
  const focusedWin = Window.focused();
  let f = focusedWin.getGrid();
  f.x = 0;
  f.w = GRID_WIDTH / 2;
  focusedWin.setGrid(f, focusedWin.screen());

  const otherWins = focusedWin.screen().windows({ visible: true }).filter(win => win.title() !== focusedWin.title());
  const nextWin = otherWins[0];
  if (!nextWin) { return; }

  f = nextWin.getGrid();
  f.x = GRID_WIDTH / 2;
  f.w = GRID_WIDTH / 2;
  nextWin.setGrid(f, nextWin.screen());
  focusedWin.focus();
});

// Resize all windows on screen to fit grid evenly
Key.on('b', hyper, function () {
  const windows = Screen.main().windows({ visible: true });
  const winCount = windows.length;
  windows.forEach(function (win, i) {
    const f = win.getGrid();
    const width = Math.floor(GRID_WIDTH / winCount);
    f.x = i * width;
    f.w = width;
    win.setGrid(f, win.screen());
    win.raise();
  });
});

// -----------------------------------------
// Window Size
// -----------------------------------------

// Undo last window position change
Key.on('z', hyper, function () {
  if (lastWindowFrame) {
    lastWindowFrame.win.setFrame(lastWindowFrame.frame);
    lastWindowFrame = null;
  }
});

// Fill window to screen
Key.on('m', hyper, () => Window.focused().maximize());

// Expand window to the right
Key.on('o', hyper, () => expandRight());

// Expand window to the left (if at left edge, expands right instead)
Key.on('h', hyper, function () {
  const win = Window.focused();
  const winFrame = win.frame();
  const f = win.getGrid();
  f.x = Math.max(f.x - 1, 0);
  win.setGrid(f, win.screen());
  if (winFrame.x <= MARGIN_X) {
    expandRight();
  }
});

// Expand window to the right (if at right edge, expands left instead)
Key.on('l', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  const atRightEdge = (f.x + f.w) >= GRID_WIDTH;
  f.x = Math.min(f.x + 1, GRID_WIDTH - f.w);
  win.setGrid(f, win.screen());
  if (atRightEdge) {
    expandRight();
  }
});

// Compress window width by one column
Key.on('i', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.w = Math.max(f.w - 1, 1);
  win.setGrid(f, win.screen());
});

// Expand window to full screen height
Key.on('u', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.y = 0;
  f.h = 2;
  win.setGrid(f, win.screen());
});

// -----------------------------------------
// Spaces
// -----------------------------------------

const moveWindowToSpace = function ({ direction = 'east', windowToMove = 'focused' } = {}) {
  const activeSpace = Space.active();
  const activeWindow = Window.focused();
  const windows = windowToMove === 'focused' ? [activeWindow] : activeSpace.windows();
  const newSpace = direction === 'east' ? activeSpace.next() : activeSpace.previous();
  if (newSpace) {
    newSpace.moveWindows(windows);
    activeWindow.focus();
  }
};

// Move focused window to the next space
Key.on('l', semiHyper, () => moveWindowToSpace({ direction: 'east' }));

// Move focused window to the previous space
Key.on('h', semiHyper, () => moveWindowToSpace({ direction: 'west' }));

// Move all windows to the next space
Key.on('u', semiHyper, () => moveWindowToSpace({ direction: 'east', windowToMove: 'all' }));

// Move all windows to the previous space
Key.on('p', semiHyper, () => moveWindowToSpace({ direction: 'west', windowToMove: 'all' }));

// -----------------------------------------
// Mouse
// -----------------------------------------

// Move cursor to center of the active screen
Key.on('space', hyper, function () {
  const { x, y, width, height } = Screen.main().flippedVisibleFrame();
  Mouse.move({ x: x + width / 2, y: y + height / 2 });
});

// -----------------------------------------
// App Launchers
// -----------------------------------------

Key.on('c', appMash, () => App.launch('Google Chrome', { focus: true }));
Key.on('t', appMash, () => App.launch('Terminal', { focus: true }));
Key.on('f', appMash, () => App.launch('Finder', { focus: true }));
Key.on('s', appMash, () => App.launch('Slack', { focus: true }));
Key.on('e', appMash, () => App.launch('Microsoft Outlook', { focus: true }));
