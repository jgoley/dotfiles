vim = 'vim-mode-plus'
commands = atom.commands
vimEditor = "atom-text-editor.#{vim}"

darkTheme = "monokai-slate"
lightTheme = "one-light-syntax"

dispatch = (command) ->
  editorElement = atom.views.getView atom.workspace.getActiveTextEditor()
  return unless editorElement
  commands.dispatch editorElement, command

resetVimNormal = ->
  dispatch "#{vim}:reset-normal-mode"

vimInsertMode  = ->
  dispatch "#{vim}:activate-insert-mode"

themeIsActive = (mode) ->
  mode in atom.themes.getActiveThemeNames()

setTheme = (themes) ->
  atom.config.set 'core.themes', themes
  atom.reload()

commands.add vimEditor, 'jgo:normal-mode-on-save', ->
  atom.workspace.saveActivePaneItem()
  resetVimNormal()

commands.add vimEditor, 'jgo:insert-newline-above-stay-normal', ->
  dispatch "#{vim}:insert-above-with-newline"
  resetVimNormal()

commands.add vimEditor, "jgo:insert-newline-below-stay-normal", ->
  dispatch "#{vim}:insert-below-with-newline"
  resetVimNormal()

commands.add vimEditor, "jgo:insert-before-first-character-of-line", ->
  dispatch "#{vim}:move-to-first-character-of-line"
  vimInsertMode()

commands.add 'atom-text-editor', 'jgo:go-light', ->
  unless themeIsActive(lightTheme)
    setTheme ["one-light-ui", lightTheme]

commands.add 'atom-text-editor', 'jgo:go-dark', ->
  unless themeIsActive(darkTheme)
    setTheme ["one-dark-ui", darkTheme]
