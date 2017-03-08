. ~/code/dotfiles/setup/variables.sh

# Bash
alias rf='rm -rf'
alias c='clear'

# Directory
alias code='~/code'
alias dots='$DOTFILES_DIR && aa'

# Editors
alias sa='subl3 .'
alias atm='atom'
alias aa='atm .'

# Git
alias gaa='git add .'
alias gbd='git branch -D'
alias gbdm='git checkout master && git branch --merged | grep -v master | xargs git branch -d'
alias gcom='git checkout master'
alias gcomp='git checkout master && ggpull'
alias gco-='git checkout -'
alias gcam='git commit -a -m '
alias gcm='git commit -m '
alias gpf='git push -f'
alias gcan='git commit -v -a --no-edit --amend'
alias gcanp='git commit -v -a --no-edit --amend && gpf'
alias gd='git diff --color'
gri () {
  git rebase -i HEAD~$1
}

greset () {
  git reset HEAD~$1
}

gcbp () {
  ggpull && gcb $1
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
alias god='sh $DOTFILES_DIR/util/go_dark.sh'     # Sets dark theme on OSX, Atom and terminal
alias gol='sh $DOTFILES_DIR/util/go_light.sh'    # Sets light theme on OSX, Atom and terminal
alias zr='exec zsh'                                 # Resets oh-my-zsh
rm () {
  trash $1
}

karabiner(){
  case "$1" in
    "list")
      $KARABINER_DIR list
    ;;
    "export")
      $KARABINER_DIR export > $DOTFILES_DIR/karabiner/karabiner-import.sh
  esac
}

alias ec='SPA_MONGO_URL=mongodb://localhost:27018/promed MONGO_URL=mongodb://localhost:27017/eidr-connect GRITS_API_KEY=Cr9LPAtL meteor --settings settings-dev.json'
