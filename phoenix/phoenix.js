const hyper = [
  'cmd',
  'alt',
  'ctrl',
  'shift'
];

const semiHyper = ["cmd", "alt"];

const appMash = [
  'cmd',
  'alt',
  'ctrl'
];

const keys = [];
const MARGIN_X = 5;
const MARGIN_Y = 5;
let GRID_WIDTH = 10;

const showModal = function (message, duration) {
  const modal = new Modal;
  modal.message = message;
  modal.duration = duration || 2;
  return modal.show();
};

const changeGridWidth = function (amount) {
  GRID_WIDTH = Math.max(1, GRID_WIDTH + amount);
  Phoenix.notify(`Grid is now ${GRID_WIDTH} tiles wide`);
  return _.each(Window.all({ visible: true }), win => win.snapToGrid());
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
  return win.setGrid(f, win.screen());
};

// -----------------------------------------
// Grid
// -----------------------------------------

Window.prototype.getGrid = function () {
  const winFrame = this.frame();
  const screen = this.screen().flippedVisibleFrame();
  const thirdScreenWidth = screen.width / GRID_WIDTH;
  const halfScreenHeight = screen.height / 2;

  return {
    x: Math.round((winFrame.x - screen.x) / thirdScreenWidth),
    y: Math.round((winFrame.y - screen.y) / halfScreenHeight),
    w: Math.max(1, Math.round(winFrame.width / thirdScreenWidth)),
    h: Math.max(1, Math.round(winFrame.height / halfScreenHeight))
  };
};

Window.prototype.setGrid = function (grid, screen) {
  screen = screen.flippedVisibleFrame();
  const thirdScreenWidth = screen.width / GRID_WIDTH;
  const halfScreenHeight = screen.height / 2;
  const newFrame = {
    x: (grid.x * thirdScreenWidth) + screen.x,
    y: (grid.y * halfScreenHeight) + screen.y,
    width: grid.w * thirdScreenWidth,
    height: grid.h * halfScreenHeight
  };
  newFrame.x += MARGIN_X;
  newFrame.y += MARGIN_Y;
  newFrame.width -= MARGIN_X * 2.0;
  newFrame.height -= MARGIN_Y * 2.0;
  return this.setFrame(newFrame);
};

Window.prototype.snapToGrid = function () {
  if (this.isNormal()) {
    return this.setGrid(this.getGrid(), this.screen());
  }
};

// Increase columns in grid
keys.push(new Key('=', hyper, () => changeGridWidth(+1))
);

// Decrease columns in grid
keys.push(new Key('-', hyper, () => changeGridWidth(-1))
);

// Snap focused window to grid
keys.push(new Key(';', hyper, () => Window.focused().snapToGrid())
);

// Snap all windows to grid
keys.push(new Key('\'', hyper, () => _.each(Window.all({ visible: true }), win => win.snapToGrid()))
);


// -----------------------------------------
// Window Focus
// -----------------------------------------

// Focus closet window to left
keys.push(new Key('left', hyper, () => Window.focused().focusClosestNeighbour('west'))
);

// Focus closet window to right
keys.push(new Key('right', hyper, () => Window.focused().focusClosestNeighbour('east'))
);

// Focus closet window above
keys.push(new Key('up', hyper, () => Window.focused().focusClosestNeighbour('north'))
);

// Focus closet window below
keys.push(new Key('down', hyper, () => Window.focused().focusClosestNeighbour('south'))
);

// -----------------------------------------
// Window Position
// -----------------------------------------

// Move to secondary screen
keys.push(new Key('P', hyper, function () {
  const win = Window.focused();
  return win.setGrid(win.getGrid(), win.screen().previous());
})
);

// Move to lower half of screen
keys.push(new Key('J', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.y = 1;
  f.h = 1;
  return win.setGrid(f, win.screen());
})
);

// Move to upper half
keys.push(new Key('K', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.y = 0;
  f.h = 1;
  return win.setGrid(f, win.screen());
})
);

// Center active window in screen
keys.push(new Key('return', hyper, function () {
  const win = Window.focused();
  const winFrame = win.frame();
  const screenFrame = win.screen().flippedVisibleFrame();
  return win.setFrame({
    x: (screenFrame.width - winFrame.width) / 2,
    y: (screenFrame.height - winFrame.height) / 2,
    width: winFrame.width,
    height: winFrame.height
  });
})
);

// Move far eastern side of screen
keys.push(new Key(']', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.x = GRID_WIDTH - f.w;
  return win.setGrid(f, win.screen());
})
);

// Move far western side of screen
keys.push(new Key('[', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.x = 0;
  return win.setGrid(f, win.screen());
})
);

// Resize the first two windows to 50% width and postiion them side by side
keys.push(new Key('N', hyper, function () {
  const focusedWin = Window.focused();
  let f = focusedWin.getGrid();
  f.x = 0;
  f.w = GRID_WIDTH / 2;
  focusedWin.setGrid(f, focusedWin.screen());
  const otherWins = focusedWin.screen().windows({ visible: true }).filter(win => win.title() !== focusedWin.title());
  const nextWin = otherWins.length ? otherWins[0] : null;
  nextWin && console.log("next", nextWin.title());
  if (!nextWin) { return; }
  f = nextWin.getGrid();
  f.x = GRID_WIDTH / 2;
  f.w = GRID_WIDTH / 2;
  nextWin.setGrid(f, nextWin.screen());
  return focusedWin.focus();
})
);

// Resize all windows in Screen to fit grid
keys.push(new Key('B', hyper, function () {
  const windows = Screen.main().windows({ visible: true });
  const winCount = windows.length;
  return windows.forEach(function (win, i) {
    const f = win.getGrid();
    const width = Math.floor(GRID_WIDTH / winCount);
    f.x = i * width;
    f.w = width;
    win.setGrid(f, win.screen());
    return win.raise();
  });
})
);

// -----------------------------------------
// Window Size
// -----------------------------------------

// Fill window to screen
keys.push(new Key('M', hyper, function () {
  let win;
  return win = Window.focused().maximize();
})
);

keys.push(new Key('O', hyper, () => expandRight())
);

// Expand window to left.
// If window is against the left side of screen and not full screen,
// window will expand to right
keys.push(new Key('H', hyper, function () {
  const win = Window.focused();
  const winFrame = win.frame();
  const f = win.getGrid();
  f.x = Math.max(f.x - 1, 0);
  win.setGrid(f, win.screen());
  if (winFrame.x <= MARGIN_X) {
    return expandRight();
  }
})
);

// Expand window to right.
// If window is against the right side of screen and not full screen,
// window will expand to left
keys.push(new Key('L', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  const frame = win.frame();
  const screenFrame = Screen.main().flippedVisibleFrame();
  f.x = Math.min(f.x + 1, GRID_WIDTH - f.w);
  win.setGrid(f, win.screen());
  console.log(frame.x + (screenFrame.width / GRID_WIDTH), screenFrame.width - (MARGIN_X + MARGIN_Y));
  if ((frame.x + (Math.floor(screenFrame.width / GRID_WIDTH))) > (screenFrame.width - (MARGIN_X + MARGIN_Y))) {
    return expandRight();
  }
})
);

// Compress window to left
keys.push(new Key('I', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.w = Math.max(f.w - 1, 1);
  return win.setGrid(f, win.screen());
})
);

// Expand to screen height
keys.push(new Key('U', hyper, function () {
  const win = Window.focused();
  const f = win.getGrid();
  f.y = 0;
  f.h = 2;
  return win.setGrid(f, win.screen());
})
);

//#################################################
//#################################################
// Spaces
//#################################################
//#################################################

const moveScreenToSpace = function (...args) {
  const obj = args[0], val = obj.direction, direction = val != null ? val : 'east', val1 = obj.windowToMove, windowToMove = val1 != null ? val1 : "focused";
  let windows = [];
  const activeSpace = Space.active();
  const activeWindow = Window.focused();

  windows = windowToMove === "focused" ? [activeWindow] : activeSpace.windows();
  const newSpace = direction === "east" ? activeSpace.next() : activeSpace.previous();
  if (newSpace) {
    newSpace.moveWindows(windows);
    return activeWindow.focus();
  }
};

// Move focused window to the *next* space and focus to the space
keys.push(new Key('l', semiHyper, () => moveScreenToSpace({ direction: "east" }))
);

// Move focused window to the *previous* space and focus to the space
keys.push(new Key('h', semiHyper, () => moveScreenToSpace({ direction: "west" }))
);

// Move all windows to the *next* space and focus to the space
keys.push(new Key('u', semiHyper, () => moveScreenToSpace({ direction: "east", windowToMove: "all" }))
);

// Move all windows to the *previous* space and focus to the space
keys.push(new Key('p', semiHyper, () => moveScreenToSpace({ direction: "west", windowToMove: "all" }))
);

//#################################################
//#################################################
// Mouse
//#################################################
//#################################################

// Move cursor to the center of the active screen
keys.push(new Key('space', hyper, function () {
  const { width, height } = Screen.main().flippedVisibleFrame();
  return Mouse.move({ x: width / 2, y: height / 2 });
})
);


//#################################################
//#################################################
// App related Key Bindings
//#################################################
//#################################################

keys.push(new Key('C', appMash, () => App.launch('Google Chrome').focus())
);
