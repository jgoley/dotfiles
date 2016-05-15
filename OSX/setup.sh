. ../setup/variables.sh

echo $BOLD'Setting OSX defaults...'$NORM
. set-defaults.sh
echo $GREEN $CHECK' Done'$WHITE

echo $BOLD'Setting Terminal theme...'$NORM
osascript ../terminal/terminal-default.scpt
sleep .5
