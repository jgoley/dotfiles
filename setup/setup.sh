#!/bin/bash

. fn.sh

dotfiles_folder=~/code/dotfiles

install_zsh

homebrew_install

dotfiles='git phoenix zsh atom'
link_dotfiles

cd $dotfiles_folder/OSX
sh set-OSX-defaults.sh
