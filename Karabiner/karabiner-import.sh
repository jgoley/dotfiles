. $HOME/code/dotfiles/setup/variables.sh

KARABINER_CONFIG_FILE='karabiner.json'
KARABINER_DIR=~/.config/karabiner/
COMPLEX_MOD_CONFIG_FILE='complex_modifications.json'
COMPLEX_MOD_DIR=$KARABINER_DIR'assets/complex_modifications/'

cson2json $DOTFILES_DIR/karabiner/complex_modifications.cson > $DOTFILES_DIR/karabiner/complex_modifications.json
mkdir -p $KARABINER_DIR

# Main Config
if [ ! -f $KARABINER_DIR$KARABINER_CONFIG_FILE ]
then
  ln -s $DOTFILES_DIR/karabiner/$KARABINER_CONFIG_FILE $KARABINER_DIR$KARABINER_CONFIG_FILE
  echo $GREEN $CHECK $KARABINER_CONFIG_FILE' linked' $WHITE
else
  echo $BOLD $KARABINER_CONFIG_FILE' already linked'$NORM
fi

# Complex Modifications Config
if [ ! -f $COMPLEX_MOD_DIR$COMPLEX_MOD_CONFIG_FILE ]
then
  ln -s $DOTFILES_DIR/karabiner/$COMPLEX_MOD_CONFIG_FILE $COMPLEX_MOD_DIR$COMPLEX_MOD_CONFIG_FILE
  echo $GREEN $CHECK $COMPLEX_MOD_CONFIG_FILE' linked' $WHITE
else
  echo $BOLD $COMPLEX_MOD_CONFIG_FILE' already linked'$NORM
fi
