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


showModal = (message, duration=2) ->
  modal = new Modal
  modal.message = message
  modal.duration = duration
  modal.show()

changeGridWidth = (amount) ->
  GRID_WIDTH = Math.max(1, GRID_WIDTH + amount)
  Phoenix.notify "Grid is now #{GRID_WIDTH} tiles wide"
  _.each Window.all(visible: true), (win) ->
    win.snapToGrid()

calculateWindowPosition = (windowNumber, windowWidth) ->
  position = windowWidth * windowNumber
  if windowNumber > 0
    position += (MARGIN_X * 2) * windowNumber + MARGIN_X
  position or MARGIN_X


Window::getGrid = ->
  winFrame = @frame()
  screenFrame = @screen().frame()
  thirdScreenWidth = screenFrame.width / GRID_WIDTH
  halfScreenHeight = screenFrame.height / 2

  x: Math.round((winFrame.x - screenFrame.x) / thirdScreenWidth)
  y: Math.round((winFrame.y - screenFrame.y) / halfScreenHeight)
  w: Math.max(1, Math.round(winFrame.width / thirdScreenWidth))
  h: Math.max(1, Math.round(winFrame.height / halfScreenHeight))

Window::setGrid = (grid, screen) ->
  screenFrame = screen.frame()
  thirdScreenWidth = screenFrame.width / GRID_WIDTH
  halfScreenHeight = screenFrame.height / 2
  newFrame =
    x: grid.x * thirdSceenWidth + screenFrame.x
    y: grid.y * halfScreenHeight + screenFrame.y
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

Window::moveRight = ->
  grid = @getGrid()
  grid.x = Math.min(grid.x + 1, GRID_WIDTH - grid.w)
  @setGrid(grid, @screen())
  @

Window::expandRight = ->
  grid = @getGrid()
  if grid.w == GRID_WIDTH - grid.x and grid.x isnt 0
    ++grid.w
    --grid.x
  else
    grid.w = Math.min(grid.w + 1, GRID_WIDTH - grid.x)
  @setGrid(grid, @screen())
  @

Window::compress = ->
  grid = @getGrid()
  grid.w = Math.max(grid.w - 1, 1)
  @setGrid(grid, @screen())
  @

['1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach (number) ->
  keys.push new Key number, hyper, ->
    number = +number
    doubleMargin = MARGIN_X * 2
    screen = Window.focused().screen()
    screenFrame = screen.frame()
    # Calculate adjustment based on margin of each window and padding on
    # left and right of screen
    marginAdjustment = (number - 1) * doubleMargin + doubleMargin
    windowWidth = Math.round((screenFrame.width  - marginAdjustment) / number)
    windowHeight = screenFrame.height - doubleMargin
    overflowPosition = 0

    screen.windows(visible: true).forEach (win, i) ->
      if i < number
        windowXPosition = calculateWindowPosition(i, windowWidth)
      else # If there are more windows than positions
        windowXPosition = calculateWindowPosition(overflowPosition, windowWidth)
        overflowPosition++
      win.setFrame
        x: windowXPosition
        y: MARGIN_Y
        width: windowWidth
        height: windowHeight

    if overflowPosition > 0
      Phoenix.notify "There are more than #{number} windows...some overlap."
    if windowWidth <= 400
      Phoenix.notify "Some windows probably aren't scaled down due to min app window restrictions."

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
  win.expandRight()
  win.neighbours('east').forEach (neighbour) ->
    if neighbour.isVisible()
      neighbour.moveRight()

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
  win = Window.focused()
  win.setFullScreen(not win.isFullScreen())

###
 App related Key Bindings
###

keys.push new Key 'C', appMash, ->
  App.launch('Google Chrome').focus()

keys.push new Key 'T', appMash, ->
  App.launch('Terminal').focus()
