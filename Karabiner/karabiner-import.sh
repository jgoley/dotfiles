KARABINER_DIR=~/.karabiner.d/configuration/
KARABINER_CONFIG=$KARABINER_DIR'karabiner.json'

cson2json $DOTFILES_DIR/karabiner/complex_modifications.cson > $DOTFILES_DIR/karabiner/complex_modifications.json
mkdir -p $KARABINER_DIR

if [ ! -f $KARABINER_CONFIG ]
then
  ln -s $DOTFILES_DIR/karabiner/karabiner.json $KARABINER_DIR'karabiner.json'
  echo $GREEN $CHECK "Karabiner config linked" $WHITE
else
  echo $BOLD'Karabiner config already linked'$NORM
fi
