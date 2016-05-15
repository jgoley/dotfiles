. variables.sh

dotfiles="git phoenix zsh atom Karabiner"

link_files () {
  cd $dotfiles_folder
  for file in `ls $FOLDER`
    do
      current_dir=`pwd`
      path_file=$current_dir/$FOLDER/$file
      file_linked_name=$dot$file
      path_file_linked=$destination$file_linked_name
      if [ ! "$path_file_linked" ]
      then
        ln -s $path_file $path_file_linked
        echo $GREEN $CHECK $path_file_linked" linked" $WHITE
      else
        echo $GREEN $REDO $path_file_linked" already exists, re-linked" $WHITE
        rm "$destination$dot$file"
        ln -s $path_file "$path_file_linked"
      fi
    done
}

for FOLDER in $dotfiles
  do
    destination=$HOME"/"
    dot="."
    echo $BOLD"Linking "$FOLDER" files"$NORM
    case "$FOLDER" in
      "atom")
        destination=$HOME/.atom/
        dot=""
      ;;
      "Karabiner")
        destination=$HOME/Library/Application\ Support/Karabiner/
        dot=""
      ;;
    esac
    link_files
    echo
  done
