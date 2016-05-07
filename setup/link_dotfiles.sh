. variables.sh

dotfiles='git phoenix zsh atom'

link_files () {
  for file in `ls $folder`
    do
      current_dir=`pwd`
      path_file=$current_dir/$folder/$file
      file_linked_name=$dot$file
      path_file_linked=$destination$file_linked_name
      if [ ! -s $path_file_linked ]
      then
        ln -s $path_file $path_file_linked
        echo ${GREEN}$path_file_linked${WHITE}' linked'
      else
        echo ${GREEN}$path_file_linked${WHITE}' already exists, re-linking...'
        rm $path_file_linked
        ln -s $path_file $path_file_linked
      fi
    done
}

cd $dotfiles_folder

for folder in $dotfiles
  do
    destination=~/
    dot='.'
    echo $BOLD'Linking '$folder' files'$NORM
    if [ $folder = 'atom' ]
    then
      destination=~/.atom/
      dot=''
    fi
    link_files
    echo
  done
