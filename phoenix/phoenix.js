#!/usr/bin/env coffee -b -p

hyper = [
  'cmd'
  'alt'
  'ctrl'
  'shift'
]

semiHyper = [ "cmd", "alt" ]

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

expandRight = () ->
  win = Window.focused()
  f = win.getGrid()
  if f.w == GRID_WIDTH - f.x and f.x isnt 0
    ++f.w
    --f.x
  else
    f.w = Math.min(f.w + 1, GRID_WIDTH - f.x)
  win.setGrid f, win.screen()

# -----------------------------------------
# Grid
# -----------------------------------------

Window::getGrid = ->
  winFrame = @frame()
  screen = @screen().flippedVisibleFrame()
  thirdScreenWidth = screen.width / GRID_WIDTH
  halfScreenHeight = screen.height / 2

  x: Math.round((winFrame.x - screen.x) / thirdScreenWidth)
  y: Math.round((winFrame.y - screen.y) / halfScreenHeight)
  w: Math.max(1, Math.round(winFrame.width / thirdScreenWidth))
  h: Math.max(1, Math.round(winFrame.height / halfScreenHeight))

Window::setGrid = (grid, screen) ->
  screen = screen.flippedVisibleFrame()
  thirdScreenWidth = screen.width / GRID_WIDTH
  halfScreenHeight = screen.height / 2
  newFrame =
    x: grid.x * thirdScreenWidth + screen.x
    y: grid.y * halfScreenHeight + screen.y
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

# Increase columns in grid
keys.push new Key '=', hyper, ->
  changeGridWidth(+1)

# Decrease columns in grid
keys.push new Key '-', hyper, ->
  changeGridWidth(-1)

# Snap focused window to grid
keys.push new Key ';', hyper, ->
  Window.focused().snapToGrid()

# Snap all windows to grid
keys.push new Key '\'', hyper, ->
  _.each Window.all(visible: true), (win) ->
    win.snapToGrid()


# -----------------------------------------
# Window Focus
# -----------------------------------------

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

# -----------------------------------------
# Window Position
# -----------------------------------------

# Move to secondary screen
keys.push new Key 'P', hyper, ->
  win = Window.focused()
  win.setGrid win.getGrid(), win.screen().previous()

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

# Center active window in screen
keys.push new Key 'return', hyper, ->
  win = Window.focused()
  winFrame = win.frame()
  screenFrame = win.screen().flippedVisibleFrame()
  win.setFrame({
    x: (screenFrame.width - winFrame.width) / 2
    y: (screenFrame.height - winFrame.height) / 2
    width: winFrame.width
    height: winFrame.height
  })

# Move far eastern side of screen
keys.push new Key ']', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  f.x = GRID_WIDTH - f.w
  win.setGrid f, win.screen()

# Move far western side of screen
keys.push new Key '[', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  f.x = 0
  win.setGrid f, win.screen()

# Resize the first two windows to 50% width and postiion them side by side
keys.push new Key 'N', hyper, ->
  focusedWin = Window.focused()
  f = focusedWin.getGrid()
  f.x = 0
  f.w = GRID_WIDTH / 2
  focusedWin.setGrid f, focusedWin.screen()
  otherWins = focusedWin.screen().windows({visible: true}).filter((win) -> win.title() != focusedWin.title())
  nextWin = if otherWins.length then otherWins[0] else null
  nextWin && console.log("next", nextWin.title())
  return if !nextWin
  f = nextWin.getGrid()
  f.x = GRID_WIDTH / 2
  f.w = GRID_WIDTH / 2
  nextWin.setGrid f, nextWin.screen()
  focusedWin.focus()

# Resize all windows in Screen to fit grid
keys.push new Key 'B', hyper, ->
  winCount = Window.all(visible: true).length
  Window.all(visible: true).forEach (win, i) ->
    f = win.getGrid()
    width = Math.floor(GRID_WIDTH / winCount)
    f.x = i * width
    f.w = width
    win.setGrid f, win.screen()
    win.raise()

# -----------------------------------------
# Window Size
# -----------------------------------------

# Fill window to screen
keys.push new Key 'M', hyper, ->
  win = Window.focused().maximize()

keys.push new Key 'O', hyper, ->
  expandRight()

# Expand window to left.
# If window is against the left side of screen and not full screen,
# window will expand to right
keys.push new Key 'H', hyper, ->
  win = Window.focused()
  winFrame = win.frame()
  f = win.getGrid()
  f.x = Math.max(f.x - 1, 0)
  win.setGrid f, win.screen()
  if winFrame.x <= MARGIN_X
    expandRight()

# Expand window to right.
# If window is against the right side of screen and not full screen,
# window will expand to left
keys.push new Key 'L', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  frame = win.frame()
  screenFrame = Screen.main().flippedVisibleFrame()
  f.x = Math.min(f.x + 1, GRID_WIDTH - f.w)
  win.setGrid f, win.screen()
  if frame.x + frame.width > screenFrame.width - MARGIN_X - MARGIN_Y
    expandRight()

# Compress window to left
keys.push new Key 'I', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  f.w = Math.max(f.w - 1, 1)
  win.setGrid f, win.screen()

# Expand to screen height
keys.push new Key 'U', hyper, ->
  win = Window.focused()
  f = win.getGrid()
  f.y = 0
  f.h = 2
  win.setGrid f, win.screen()

##################################################
##################################################
# Spaces
##################################################
##################################################

moveScreenToSpace = ({direction='east', windowToMove="focused"}) ->
  windows = []
  activeSpace = Space.active();
  activeWindow = Window.focused()

  windows = if windowToMove == "focused" then [activeWindow] else activeSpace.windows()
  newSpace = if direction == "east" then activeSpace.next() else activeSpace.previous()
  if newSpace
    newSpace.moveWindows(windows);
    activeWindow.focus();

# Move focused window to the *next* space and focus to the space
keys.push new Key 'l', semiHyper, ->
  moveScreenToSpace({direction: "east"})

# Move focused window to the *previous* space and focus to the space
keys.push new Key 'h', semiHyper, ->
  moveScreenToSpace({direction: "west"})

# Move all windows to the *next* space and focus to the space
keys.push new Key 'u', semiHyper, ->
  moveScreenToSpace({direction: "east", windowToMove: "all"})

# Move all windows to the *previous* space and focus to the space
keys.push new Key 'p', semiHyper, ->
  moveScreenToSpace({direction: "west", windowToMove: "all"})

##################################################
##################################################
# Mouse
##################################################
##################################################

# Move cursor to the center of the active screen
keys.push new Key 'space', hyper, ->
  { width, height } = Screen.main().flippedVisibleFrame()
  Mouse.move({ x: width / 2, y: height / 2  });


##################################################
##################################################
# App related Key Bindings
##################################################
##################################################

keys.push new Key 'C', appMash, ->
  App.launch('Google Chrome').focus()
