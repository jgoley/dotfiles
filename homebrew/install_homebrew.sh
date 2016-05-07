. ../setup/variables.sh

echo $BOLD'Installing Homebrew'$NORM
which -s brew
if [ $? != 0 ]
then
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
  brew update
fi
echo $BOLD'Installing Homebrew Cask'$NORM

brew tap caskroom/cask
brew tap Homebrew/bundle
brew bundle -v
