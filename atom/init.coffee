atom.commands.add 'atom-text-editor.vim-mode-plus', 'jgo:normal-mode-on-save', ->
  atom.workspace.saveActivePaneItem()
  # Switch to normal Vim mode
  editorElement = atom.views.getView atom.workspace.getActiveTextEditor()
  atom.commands.dispatch editorElement, 'vim-mode-plus:reset-normal-mode'
