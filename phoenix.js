'use strict'

var GRID_WIDTH, MARGIN_X, MARGIN_Y, changeGridWidth, showModal, hyper, keys;

hyper = ['cmd', 'alt', 'ctrl', 'shift'];

keys = [];

MARGIN_X = 5;
MARGIN_Y = 5;
GRID_WIDTH = 2;

showModal = function(message, duration) {
  var modal = new Modal();
  modal.message = message;
  modal.duration = duration;
  modal.show();
}

changeGridWidth = function(amount) {
  GRID_WIDTH = Math.max(1, GRID_WIDTH + amount);
  showModal('Grid is now ' + GRID_WIDTH + ' tiles wide', 1);
  _.each(Window.visibleWindows(), function(win) {
    win.snapToGrid();
  });
};

Window.prototype.getGrid = function() {
  var halfScreenHeight, screenRect, thirdScreenWidth, winFrame;
  winFrame = this.frame();
  screenRect = this.screen().frameInRectangle();
  thirdScreenWidth = screenRect.width / GRID_WIDTH;
  halfScreenHeight = screenRect.height / 2;
  return {
    x: Math.round((winFrame.x - screenRect.x) / thirdScreenWidth),
    y: Math.round((winFrame.y - screenRect.y) / halfScreenHeight),
    w: Math.max(1, Math.round(winFrame.width / thirdScreenWidth)),
    h: Math.max(1, Math.round(winFrame.height / halfScreenHeight))
  };
};

Window.prototype.setGrid = function(grid, screen) {
  var halfScreenHeight, newFrame, screenRect, thirdScreenWidth;
  screenRect = screen.frameInRectangle();
  thirdScreenWidth = screenRect.width / GRID_WIDTH;
  halfScreenHeight = screenRect.height / 2;
  newFrame = {
    x: grid.x * thirdScreenWidth + screenRect.x,
    y: grid.y * halfScreenHeight + screenRect.y,
    width: grid.w * thirdScreenWidth,
    height: grid.h * halfScreenHeight
  };
  newFrame.x += MARGIN_X;
  newFrame.y += MARGIN_Y;
  newFrame.width -= MARGIN_X * 2.0;
  newFrame.height -= MARGIN_Y * 2.0;
  this.setFrame(newFrame);
};

Window.prototype.snapToGrid = function() {
  if (this.isNormal()) {
    this.setGrid(this.getGrid(), this.screen());
  }
};

keys.push(Phoenix.bind(';', hyper, function() {
  Window.focusedWindow().snapToGrid();
}));

keys.push(Phoenix.bind('\'', hyper, function() {
  _.each(Window.visibleWindows(), function(win) {
    win.snapToGrid();
  });
}));

keys.push(Phoenix.bind('=', hyper, function() {
  changeGridWidth(+1);
}));

keys.push(Phoenix.bind('-', hyper, function() {
  changeGridWidth(-1);
}));

keys.push(Phoenix.bind('left', hyper, function() {
  Window.focusedWindow().focusClosestWindowInWest();
}));

keys.push(Phoenix.bind('right', hyper, function() {
  Window.focusedWindow().focusClosestWindowInEast();
}));

keys.push(Phoenix.bind('up', hyper, function() {
  Window.focusedWindow().focusClosestWindowInNorth();
}));

keys.push(Phoenix.bind('down', hyper, function() {
  Window.focusedWindow().focusClosestWindowInSouth();
}));

// Fill window to screen
keys.push(Phoenix.bind('M', hyper, function() {
  win = Window.focusedWindow().maximize();
  return true;
}));

// Move window to left
keys.push(Phoenix.bind('H', hyper, function() {
  var f, win;
  win = Window.focusedWindow();
  f = win.getGrid();
  f.x = Math.max(f.x - 1, 0);
  win.setGrid(f, win.screen());
  return true;
}));

// Move window to right
keys.push(Phoenix.bind('L', hyper, function() {
  var f, win;
  win = Window.focusedWindow();
  f = win.getGrid();
  f.x = Math.min(f.x + 1, GRID_WIDTH - f.w);
  win.setGrid(f, win.screen());
  return true;
}));

// Expand window to right
keys.push(Phoenix.bind('O', hyper, function() {
  var f, win;
  win = Window.focusedWindow();
  f = win.getGrid();
  f.w = Math.min(f.w + 1, GRID_WIDTH - f.x);
  win.setGrid(f, win.screen());
  return true;
}));

// Compress window to left
keys.push(Phoenix.bind('I', hyper, function() {
  var f, win;
  win = Window.focusedWindow();
  f = win.getGrid();
  f.w = Math.max(f.w - 1, 1);
  win.setGrid(f, win.screen());
  return true;
}));

// Move to lower half of screen
keys.push(Phoenix.bind('J', hyper, function() {
  var f, win;
  win = Window.focusedWindow();
  f = win.getGrid();
  f.y = 1;
  f.h = 1;
  win.setGrid(f, win.screen());
  return true;
}));

// Move to upper half
keys.push(Phoenix.bind('K', hyper, function() {
  var f, win;
  win = Window.focusedWindow();
  f = win.getGrid();
  f.y = 0;
  f.h = 1;
  win.setGrid(f, win.screen());
  return true;
}));

// Expand to screen height
keys.push(Phoenix.bind('U', hyper, function() {
  var f, win;
  win = Window.focusedWindow();
  f = win.getGrid();
  f.y = 0;
  f.h = 2;
  win.setGrid(f, win.screen());
  return true;
}));
