#!/bin/bash

. variables.sh

. install_zsh.sh

. $dotfiles_folder/homebrew/install_homebrew.sh

. link_dotfiles.sh

. $dotfiles_folder/OSX/set-defaults.sh
