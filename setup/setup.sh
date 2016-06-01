#!/bin/bash

. variables.sh

. install_zsh.sh

. $DOTFILES_DIR/homebrew/install_homebrew.sh

. link_dotfiles.sh

. $DOTFILES_DIR/OSX/set-defaults.sh

sh $DOTFILES_DIR/Karabiner/karabiner-import.sh
