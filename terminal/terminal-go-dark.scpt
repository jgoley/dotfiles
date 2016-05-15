tell application "Terminal"
  local themePath
  set themePath to "code/dotfiles/terminal/one-dark/scheme/one-dark/"
  set themeName to "One Dark 1.0.1"
  set windowCount to number of windows
  do shell script "cd ~/ ; open '" & themePath & themeName & ".terminal'"
  delay 1
  repeat with x from 1 to windowCount
    set tabCount to number of tabs in window x
    set current settings of window x to settings set themeName
    set current settings of tabs of window x to settings set themeName
  end repeat
  close window 1
end tell
