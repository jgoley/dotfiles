#!/usr/bin/env coffee -b -p

Phoenix.set
  daemon: true
  openAtLogin: true

hyper = [
  'cmd'
  'alt'
  'ctrl'
  'shift'
]

appMash = [
  'cmd'
  'alt'
  'ctrl'
]

keys = []
MARGIN_X = 5
MARGIN_Y = 5
GRID_WIDTH = 10

showModal = (message, duration) ->
  modal = new Modal
  modal.message = message
  modal.duration = duration or 2
  modal.show()

changeGridWidth = (amount) ->
  GRID_WIDTH = Math.max(1, GRID_WIDTH + amount)
  Phoenix.notify "Grid is now #{GRID_WIDTH} tiles wide"
  _.each Window.all(visible: true), (win) ->
    win.snapToGrid()

Window::getGrid = ->
  winFrame = @frame()
  screenRect = @screen().frame()
  thirdScreenWidth = screenRect.width / GRID_WIDTH
  halfScreenHeight = screenRect.height / 2

  x: Math.round((winFrame.x - screenRect.x) / thirdScreenWidth)
  y: Math.round((winFrame.y - screenRect.y) / halfScreenHeight)
  w: Math.max(1, Math.round(winFrame.width / thirdScreenWidth))
  h: Math.max(1, Math.round(winFrame.height / halfScreenHeight))

Window::setGrid = (grid, screen) ->
  screenRect = screen.frame()
  thirdScreenWidth = screenRect.width / GRID_WIDTH
  halfScreenHeight = screenRect.height / 2
  newFrame =
    x: grid.x * thirdScreenWidth + screenRect.x
    y: grid.y * halfScreenHeight + screenRect.y
    width: grid.w * thirdScreenWidth
    height: grid.h * halfScreenHeight
  newFrame.x += MARGIN_X
  newFrame.y += MARGIN_Y
  newFrame.width  -= MARGIN_X * 2.0
  newFrame.height -= MARGIN_Y * 2.0
  @setFrame newFrame

Window::snapToGrid = ->
  if @isNormal()
    @setGrid @getGrid(), @screen()

Window::setWindowsPerSpace = (numWindows) ->
  Phoenix.notify "Setting windows to #{numWindows}"
  Phoenix.log Window.all()

Window::moveRight = ->
  grid = @getGrid()
  grid.x = Math.min(grid.x + 1, GRID_WIDTH - grid.w)
  @setGrid(grid, @screen())

Window::expandRight = ->
  grid = @getGrid()
  if grid.w == GRID_WIDTH - grid.x and grid.x isnt 0
    ++grid.w
    --grid.x
  else
    grid.w = Math.min(grid.w + 1, GRID_WIDTH - grid.x)
  @setGrid(grid, @screen())

Window::compress = ->
  grid = @getGrid()
  grid.w = Math.max(grid.w - 1, 1)
  @setGrid(grid, @screen())

log = (toLog) ->
  toLog

['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach (number) ->
  keys.push new Key number, hyper, ->
    number = +number
    screenRect = Window.focused().screen().frame()
    windowWidth = Math.round(screenRect.width / number)
    windowWidth -= MARGIN_X * 2.0
    windowHeight = screenRect.height
    Window.recent().forEach (win, i) ->
      windowXPosition = windowWidth * i
      if number == 1
        win.maximize()
      else
        win.setFrame
          x: windowXPosition
          y: MARGIN_Y
          width: windowWidth
          height: windowHeight
        win.snapToGrid()

# Snap focused window to grid
keys.push new Key ';', hyper, ->
  Window.focused().snapToGrid()

# Snap all windows to grid
keys.push new Key '\'', hyper, ->
  _.each Window.all(visible: true), (win) ->
    win.snapToGrid()

# Increase columns in grid
keys.push new Key '=', hyper, ->
  changeGridWidth(+1)

# Decrease columns in grid
keys.push new Key '-', hyper, ->
  changeGridWidth(-1)

# Focus closet window to left
keys.push new Key 'left', hyper, ->
  Window.focused().focusClosestNeighbour 'west'

# Focus closet window to right
keys.push new Key 'right', hyper, ->
  Window.focused().focusClosestNeighbour 'east'

# Focus closet window above
keys.push new Key 'up', hyper, ->
  Window.focused().focusClosestNeighbour 'north'

# Focus closet window below
keys.push new Key 'down', hyper, ->
  Window.focused().focusClosestNeighbour 'south'

# Move to secondary screen
keys.push new Key 'P', hyper, ->
  win = Window.focused()
  win.setGrid win.getGrid(), win.screen().previous()

# Fill window to screen
keys.push new Key 'M', hyper, ->
  win = Window.focused().maximize()

# Move window to left
keys.push new Key 'H', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  f.x = Math.max(f.x - 1, 0)
  win.setGrid f, win.screen()

# Move window to right
keys.push new Key 'L', hyper, ->
  win = Window.focused()
  win.moveRight()

# Expand window to right.
# If window is against the right side of screen and not full screen,
# window will expand to left
keys.push new Key 'O', hyper, ->
  win = Window.focused()
  win.neighbours('east').forEach (neighbour) ->
    neighbour.moveRight()
  win.expandRight()

# Compress window to left
keys.push new Key 'I', hyper, ->
  Window.focused().compress()

# Move to lower half of screen
keys.push new Key 'J', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  f.y = 1
  f.h = 1
  win.setGrid f, win.screen()

# Move to upper half
keys.push new Key 'K', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  f.y = 0
  f.h = 1
  win.setGrid f, win.screen()

# Expand to screen height
keys.push new Key 'U', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  f.y = 0
  f.h = 2
  win.setGrid f, win.screen()

keys.push new Key 'F', hyper, ->
  Window.focused().setFullScreen()

###
 App related Key Bindings
###

keys.push new Key 'C', appMash, ->
  App.launch('Google Chrome').focus()
