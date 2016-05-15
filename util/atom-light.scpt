tell application "Atom"
  activate
  delay 1
  tell application "System Events" to tell process "Atom" to keystroke "l" using {command down, control down, shift down}
end tell
