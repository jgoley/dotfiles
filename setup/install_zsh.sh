. $SETUP_DIR/variables.sh

if  [ -f /bin/zsh -o -f /usr/bin/zsh ]
then
  if [ ! -d ~/.oh-my-zsh/ ]
  then
    cd ~/
    git clone http://github.com/robbyrussell/oh-my-zsh.git
  fi
  # Set the default shell to zsh if it isn't currently set to zsh
  if ! $(echo $SHELL) == $(which zsh)
  then
    chsh -s $(which zsh)
  fi
else
  echo $GREEN'Oh-my-zsh already installed...updating...'$WHITE
  cd ~/.oh-my-zsh
  git pull origin master
fi
