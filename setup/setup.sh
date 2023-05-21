#!/bin/bash

ROOT_DIR=$1

if  [ -z "$ROOT_DIR" ]
then
  echo Please enter the root directory of your dotfiles
else
  SETUP_DIR=$ROOT_DIR/setup
  . $ROOT_DIR/setup/variables.sh
  . $ROOT_DIR/setup/install_zsh.sh
  . $DOTFILES_DIR/homebrew/install_homebrew.sh
  . $ROOT_DIR/setup/link_dotfiles.sh
  . $DOTFILES_DIR/OSX/set-defaults.sh
  sh $ROOT_DIR/setup/install_npms.sh
  . $DOTFILES_DIR/Karabiner/karabiner-import.sh
  . $ROOT_DIR/setup/editor.sh
fi

