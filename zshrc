ZSH_CUSTOM=$HOME/.zsh-custom
ZSH=$HOME/.oh-my-zsh
ZSH_THEME="jgo"

# CASE_SENSITIVE="true"
# DISABLE_LS_COLORS="true"
# DISABLE_AUTO_TITLE="true"
# ENABLE_CORRECTION="true"
# DISABLE_UNTRACKED_FILES_DIRTY="true"

COMPLETION_WAITING_DOTS="true"
HIST_STAMPS="mm.dd.yyyy"

plugins=(git)
source $ZSH/oh-my-zsh.sh

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi

export LANG=en_US.UTF-8
export EDITOR='mate -w'
export SSH_KEYS="~/.ssh/"

# export PACKAGE_DIRS="$HOME/code/pollinate-2/packages"

# ALIASES

alias sa='subl3 .'

alias gaa='git add .'
alias gbd='git branch -D'
alias gacmsg='git commit -a -m '

alias bowi='bower install'
alias bowis='bower install --save'

alias mtr='meteor'
alias mtra='meteor add'
alias mtrx='meteor remove'
alias mtrm='meteor mongo'
alias mtrp='mtr --production'
alias mtru='mtr update'


alias ve='source ../venv/bin/activate'

alias zr='exec zsh'
alias gritsdb='export MONGO_URL=mongodb://localhost/grits'
