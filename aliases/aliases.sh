. $HOME/code/dotfiles/setup/variables.sh

# Bash
alias rf='rm -rf'
alias c='clear'

# Directory
alias co='~/code'
alias dots='$DOTFILES_DIR && va'
alias oa='open .'

# Code Project
alias DE='~/code/delaware-ephtn/'
alias DEF='~/code/delaware-ephtn-frontend/'
alias ICE='~/code/icer-app/'
alias SBS='~/code/starbucks-vrs-suppliers'
alias SBV='~/code/starbucks-vrs-verification'
alias GS='~/code/scs-greenerstores'

# Editors
alias vi='mvim'
alias sa='subl3 .'
alias atm='atom'
alias aa='atm .'
alias vcs'code'
alias va='code .'
alias acon='git diff --name-only | uniq | xargs atom'
alias vcon='git diff --name-only | uniq | xargs vi'

# Git
alias gaa='git add .'
alias gb='git branch --sort=-committerdate'
alias gbd='git branch -D '
alias gbdm='git checkout main && git branch --merged | grep -v main | xargs git branch -d'
alias gbdp='git checkout production && git branch --merged | grep -v production | xargs git branch -d'
alias gcom='git checkout main'
alias gcop='git checkout production'
alias gcos='git checkout staging'
alias gcod='git checkout demo'
alias gcopp='gcop && ggpull'
alias gcomp='gcom && ggpull'
alias gcosp='gcos && ggpull'
alias gco-='git checkout -'
alias gcam='git commit -a -m '
alias gcm='git commit -m '
alias gpf='git push -f'
alias gcan='git commit -v -a --no-edit --amend'
alias gcanp='git commit -v -a --no-edit --amend && gpf'
alias gd='git diff --color'
alias gbc= 'git branch --show-current | pbcopy'
alias go='git open'
alias gawp='gaa && git reset head app/assets_webpacker/packs/ app/views/layouts/_head.haml config/webpack/custom.js package.json yarn.lock'
alias gccb='gb --show-current | pbcopy'
gri () {
  git rebase -i HEAD~$1
}

greset () {
  git reset HEAD~$1
}

gcbp () {
  ggpull && gcb $1
}

glob () {
  local base_branch=${1:-main}
  git log --oneline --decorate "${base_branch}..HEAD"
}

# Npm and Bower
alias npms='npm install --save '
alias bowi='bower install'
alias bowis='bower install --save'
alias nrd='npm run dev'

# Meteor
alias mtr='meteor'
alias mtra='meteor add'
alias mtrx='meteor remove'
alias mtrm='meteor mongo'
alias mtru='meteor update'
alias mtrnpm='meteor npm install --save'
alias mtrcp='meteor create --package'

# Rails
alias rn='rails new'
# alias rails='bin/rails'
alias rs='bin/rails s'
alias rc='bin/rails c'
alias rmg='bin/rails db:migrate RAILS_ENV=development'
alias lint='npm run lint'

# Webpacker (Rails
alias wpw='./bin/webpack --watch --colors --progress'
wps () {
  ./bin/webpack-dev-server WEBPACKER_DEV_SERVER_HOST=-i WEBPACKER_DEV_SERVER_HOT=true
}

# Puma-Dev
alias pds='puma-dev -stop'
alias pdl='puma-dev link'
alias pdt='tail -f log/development.log'

# Misc
alias god='sh $DOTFILES_DIR/util/go_dark.sh'     # Sets dark theme on OSX, Atom and terminal
alias gol='sh $DOTFILES_DIR/util/go_light.sh'    # Sets light theme on OSX, Atom and terminal
alias zr='exec zsh'                              # Resets oh-my-zsh
alias spt='speedtest-cli'

karabiner(){
  case "$1" in
    "list")
      $KARABINER_DIR list
    ;;
    "export")
      $KARABINER_DIR export > $DOTFILES_DIR/karabiner/karabiner-import.sh
    ;;
    "parse")
      cson2json $DOTFILES_DIR/karabiner/complex_modifications.cson > $DOTFILES_DIR/karabiner/complex_modifications.json
      cat $DOTFILES_DIR/karabiner/complex_modifications.json
  esac
}

alias copypath='pwd|pbcopy'

# Development projects
alias phr='~/code/storymd/phr/'
alias lib='cd ~/code/storymd/pimcore5/'
alias del='cd ~/code/delaware-ephtn/'
alias verite='cd ~/code/verite/verite-app/'

add_line() {
  for f in $PWD/*
  do
    filename= basename $f
    temp= "/tmp/${filename}"
    echo $temp
    # touch $temp
    # echo "$1" > $temp
    # cat  $f >> $temp
    # cp $temp $f
    # rm $temp
  done
}

# Brew Services
bsstart () {
  brew services start $1
}

bsstop () {
  brew services stop $1
}

startp11 () {
  bsstop postgresql
  bsstart postgresql@11
}

startp12 () {
  bsstop postgresql@11
  bsstart postgresql
}

alias bslist='brew services list'

# Docker
alias dcr='docker compose run --rm'
alias dup='bin/docker_start'
alias ddn='bin/docker_down'
alias dcssh='docker_ssh_runner'
# alias dup='docker compose up'
# alias ddn='docker compose down'
alias drunmg='drun bin/rails db:migrate RAILS_ENV=development'

alias dcu='docker compose up --rm'
alias dcd='bin/docker_down'
alias dcs='docker compose run shell'
alias dcr='docker compose run runner'

# Rails
alias rmg='bin/rails db:migrate RAILS_ENV=development'

# SBUX
alias sb0="ssh -A jgoley@sbux0.cafepractices.info"
alias sb1="ssh -A jgoley@sbux1.cafepractices.info"
alias sb2="ssh -A jgoley@sbux2.cafepractices.info"
alias sb3="ssh -A ubuntu@sbux3.cafepractices.info"
