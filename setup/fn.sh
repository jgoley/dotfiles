BOLD=$(tput bold)
NORM=$(tput sgr0)
GREEN="\033[32m"
WHITE="\033[m"

install_homebrew () {
  echo $BOLD'Installing Homebrew'$NORM
  which -s brew
  if [ $? != 0 ]
  then
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  else
    brew update
  fi
  echo $BOLD'Installing Homebrew Cask'$NORM

  brew tap caskroom/cask
  brew tap Homebrew/bundle
  cd $dotfiles_folder/homebrew
  brew bundle -v
}

install_zsh () {
  if  [ -f /bin/zsh -o -f /usr/bin/zsh ]
  then
    if [ ! -d ~/.oh-my-zsh/ ]
    then
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
}

link_files () {
  for file in `ls $folder`
    do
      current_dir=`pwd`
      path_file=$current_dir/$folder/$file
      file_linked_name=$dot$file
      path_file_linked=$destination$file_linked_name
      if [ ! -f $path_file_linked ]
      then
        ln -s $path_file $path_file_linked
        echo ${GREEN}$path_file_linked${WHITE}' linked'
      else
        echo ${GREEN}$path_file_linked${WHITE}' already exists, re-linking...'
        rm $path_file_linked
        ln -s $path_file $path_file_linked
      fi
    done
}

link_dotfiles () {
  cd $dotfiles_folder
  for folder in $dotfiles
    do
      destination=~/
      dot='.'
      echo $BOLD'Linking '$folder' files'$NORM
      if [ $folder = 'atom' ]
      then
        destination=~/.atom/
        dot=''
      fi
      link_files
      echo
    done
  cd $dotfiles_folder
}
