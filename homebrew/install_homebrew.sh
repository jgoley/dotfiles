. $SETUP_DIR/variables.sh

echo $BOLD'Installing Homebrew'$NORM
which -s brew
if [ $? != 0 ]
then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  brew update
fi
echo $BOLD'Installing Homebrew Cask'$NORM

brew tap caskroom/cask
brew tap Homebrew/bundle
brew bundle -v
