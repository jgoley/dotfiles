. ~/code/dotfiles/setup/variables.sh

alias zr='exec zsh'

alias rf='rm -rf'

alias sa='subl3 .'
alias atm='atom'
alias aa='atom .'

alias gaa='git add .'
alias gbd='git branch -D'
alias gcam='git commit -a -m '
alias gcm='git commit -m '
alias gpf='git push -f'
alias grbi='git rebase -i HEAD~'
alias gcan='git commit -v -a --no-edit --amend'
alias gcanp='git commit -v -a --no-edit --amend ; gpf'

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

alias god='sh $dotfiles_folder/util/go_dark.sh'
alias gol='sh $dotfiles_folder/util/go_light.sh'

alias dots='~/code/dotfiles'
