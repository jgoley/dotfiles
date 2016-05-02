ZSH_CUSTOM=$HOME/.zsh-custom
ZSH=$HOME/.oh-my-zsh
ZSH_THEME="jgo"

# CASE_SENSITIVE="true"
# DISABLE_LS_COLORS="true"
# DISABLE_AUTO_TITLE="true"
# DISABLE_UNTRACKED_FILES_DIRTY="true"

ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"
HIST_STAMPS="mm.dd.yyyy"

plugins=(
  autojump
  brew
  catimg
  git
  git-extras
  meteor
  npm
  osx
  wd
  web-search
)
source $ZSH/oh-my-zsh.sh

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi

export LANG=en_US.UTF-8
export EDITOR='atom'
export SSH_KEYS="~/.ssh/"

# ALIASES

alias zr='exec zsh'

alias rf='rm -rf'

alias sa='subl3 .'
alias atm='atom'
alias aa='atom .'

alias gaa='git add .'
alias gbd='git branch -D'
alias gcam='git commit -a -m '
alias gpf='git push -f'
alias grbi='git rebase -i HEAD~'
alias gcan='git commit -v -a --no-edit --amend'

alias bowi='bower install'
alias bowis='bower install --save'

alias mtr='meteor'
alias mtra='meteor add'
alias mtrx='meteor remove'
alias mtrm='meteor mongo'
alias mtru='meteor update'
alias mtrnpm='meteor npm install --save'
alias mtrcp='meteor create --package'

alias ve='source ../venv/bin/activate'
