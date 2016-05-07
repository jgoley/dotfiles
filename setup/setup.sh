#!/bin/bash

. fn.sh

dotfiles_folder=~/code/dotfiles

install_zsh

install_homebrew

. link_dotfiles.sh

. $dotfiles_folder/OSX/set-OSX-defaults.sh
