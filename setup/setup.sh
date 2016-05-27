#!/bin/bash

. variables.sh

. install_zsh.sh

. $DOTFILES_FOLDER/homebrew/install_homebrew.sh

. link_dotfiles.sh

. $DOTFILES_FOLDER/OSX/set-defaults.sh

sh $DOTFILES_FOLDER/Karabiner/karabiner-import.sh
