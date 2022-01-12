. $SETUP_DIR/variables.sh

DOTFILES="git phoenix zsh"

link_files () {
  cd $DOTFILES_DIR
  for FILE in `ls $FOLDER`
    do
      CURRENT_DIR=`pwd`
      PATH_FILE=$CURRENT_DIR/$FOLDER/$FILE
      FILE_LINKED_NAME=$DOT$FILE
      PATH_FILE_linked=$DESTINATION$FILE_LINKED_NAME
      if [ ! -f $PATH_FILE_linked ]
      then
        ln -s $PATH_FILE $PATH_FILE_linked
        echo $GREEN $CHECK $PATH_FILE_linked" linked" $WHITE
      else
        echo $GREEN $REDO $PATH_FILE_linked" already exists, re-linked" $WHITE
        rm "$DESTINATION$DOT$FILE"
        ln -s $PATH_FILE "$PATH_FILE_linked"
      fi
    done
}

for FOLDER in $DOTFILES
  do
    DESTINATION=$HOME"/"
    DOT="."
    echo $BOLD"Linking "$FOLDER" files"$NORM
    case "$FOLDER" in
      "atom")
        DESTINATION=$HOME/.atom/
        DOT=""
      ;;
    esac
    link_files
    echo
  done
