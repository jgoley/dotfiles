. ~/code/dotfiles/setup/variables.sh

# Bash
alias rf='rm -rf'

# Directory
alias dots='$dotfiles_folder'

# Editors
alias sa='subl3 .'
alias atm='atom'
alias aa='atom .'

# Git
alias gaa='git add .'
alias gbd='git branch -D'
alias gcam='git commit -a -m '
alias gcm='git commit -m '
alias gpf='git push -f'
alias gcan='git commit -v -a --no-edit --amend'
alias gcanp='git commit -v -a --no-edit --amend && gpf'
gri () {
  echo "rebase -i HEAD~$1"
}

# Npm and Bower
alias npms='npm install --save '
alias bowi='bower install'
alias bowis='bower install --save'

# Meteor
alias mtr='meteor'
alias mtra='meteor add'
alias mtrx='meteor remove'
alias mtrm='meteor mongo'
alias mtru='meteor update'
alias mtrnpm='meteor npm install --save'
alias mtrcp='meteor create --package'

# Misc
alias god='sh $dotfiles_folder/util/go_dark.sh'     # Sets dark theme on OSX, Atom and terminal
alias gol='sh $dotfiles_folder/util/go_light.sh'    # Sets light theme on OSX, Atom and terminal
alias zr='exec zsh'                                 # Resets oh-my-zsh
