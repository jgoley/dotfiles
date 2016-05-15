vim = 'vim-mode-plus'
editorElement = atom.views.getView atom.workspace.getActiveTextEditor()
commands = atom.commands
vimEditor = "atom-text-editor.#{vim}"

darkTheme = "monokai-slate"
lightTheme = "one-light-syntax"

dispatch = (command) ->
  commands.dispatch editorElement, command

resetVimNormal = ->
  commands.dispatch editorElement, "#{vim}:reset-normal-mode"

themeIsActive = (mode) ->
  if atom.themes.getActiveThemeNames().indexOf(mode) >= 0
    true

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

commands.add 'atom-text-editor', 'jgo:go-light', ->
  unless themeIsActive(lightTheme)
    setTheme ["one-light-ui", lightTheme]

commands.add 'atom-text-editor', 'jgo:go-dark', ->
  unless themeIsActive(darkTheme)
    setTheme ["one-dark-ui", darkTheme]
