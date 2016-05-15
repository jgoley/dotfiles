#!/bin/sh

cli=/Applications/Karabiner.app/Contents/Library/bin/karabiner

$cli set caps_lock_to_hyper_or_escape 1
/bin/echo -n .
$cli set repeat.initial_wait 250
/bin/echo -n .
$cli set jgo.control_TO_caps 1
/bin/echo -n .
$cli set jgo.hyper_TO_right_option 1
/bin/echo -n .
$cli set jgo.control_to_caps 1
/bin/echo -n .
$cli set repeat.wait 33
/bin/echo -n .
$cli set remap.simcursor_to_diagonal_cursor 1
/bin/echo -n .
$cli set option.emacsmode_controlSlashTerminal 1
/bin/echo -n .
$cli set terminal.leftToH 1
/bin/echo -n .
$cli set global.leftToH 1
/bin/echo -n .
$cli set jgo.left_TO_H 1
/bin/echo -n .
/bin/echo
