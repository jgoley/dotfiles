ZSH_CUSTOM=$HOME/.zsh-custom
ZSH=$HOME/.oh-my-zsh
ZSH_THEME="jgo"

# CASE_SENSITIVE="true"
# DISABLE_LS_COLORS="true"
# DISABLE_AUTO_TITLE="true"
# ENABLE_CORRECTION="true"
# DISABLE_UNTRACKED_FILES_DIRTY="true"
# ZSH_CUSTOM=/path/to/new-custom-folder

COMPLETION_WAITING_DOTS="true"
HIST_STAMPS="mm.dd.yyyy"

plugins=(git)
source $ZSH/oh-my-zsh.sh

export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi

export LANG=en_US.UTF-8
export EDITOR='mate -w'
export SSH_KEYS="~/.ssh/"

alias sa='subl3 .'
alias gaa='git add .'
alias gbd='git branch -D'
alias bowi='bower install'
alias bowis='bower install --save'
alias gacmsg='git commit -a -m '
alias mtr='meteor'
alias mtra='meteor add'
alias mtrx='meteor remove'
alias mtrm='meteor mongo'
alias mtrp='mtr --production'
alias mtrt='VELOCITY_CI=1 CHIMP_OPTIONS="" meteor --test'
alias mtrtb='VELOCITY_CI=1 SELENIUM_BROWSER=chrome meteor --test'
alias mtrtdev='VELOCITY_CI=1 CUCUMBER_TAGS=@dev CUCUMBER_FORMAT=summary meteor run'
alias mtrtt='meteor test-packages packages/*'
alias mtrr='VELOCITY=0 meteor run'
alias ve='source ../venv/bin/activate'
