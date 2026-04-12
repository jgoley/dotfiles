# Phoenix Key Bindings

## Modifier Keys

| Name         | Keys                              | Notes                            |
|--------------|-----------------------------------|----------------------------------|
| `hyper`      | `⌘` `⌥` `⌃` `⇧`                  | Caps Lock acts as `⌃` (Karabiner) |
| `semiHyper`  | `⌘` `⌥`                           |                                  |
| `appMash`    | `⌘` `⌥` `⌃`                       |                                  |

---

## Grid Management

The screen is divided into a grid — default **10 columns × 2 rows**.
Adjust the column count on the fly; all windows re-snap automatically.

| Key               | Action                          |
|-------------------|---------------------------------|
| `hyper` + `=`     | Increase grid column count      |
| `hyper` + `-`     | Decrease grid column count      |
| `hyper` + `;`     | Snap focused window to grid     |
| `hyper` + `'`     | Snap **all** windows to grid    |

---

## Window Focus

| Key               | Action                          |
|-------------------|---------------------------------|
| `hyper` + `←`     | Focus nearest window to left    |
| `hyper` + `→`     | Focus nearest window to right   |
| `hyper` + `↑`     | Focus nearest window above      |
| `hyper` + `↓`     | Focus nearest window below      |

---

## Window Position

### Halves

```
┌───────────┐   ┌───────────┐
│  ▓▓▓▓▓▓▓  │   │           │
│  ▓ top ▓  │   │  ▓▓▓▓▓▓▓  │
│  ▓▓▓▓▓▓▓  │   │  ▓ bot ▓  │
│           │   │  ▓▓▓▓▓▓▓  │
└───────────┘   └───────────┘
  hyper + K       hyper + J
```

| Key               | Action                          |
|-------------------|---------------------------------|
| `hyper` + `k`     | Move to upper half              |
| `hyper` + `j`     | Move to lower half              |
| `hyper` + `u`     | Expand to full screen height    |

### Quarters

```
┌─────┬─────┐   ┌─────┬─────┐
│▓▓▓▓▓│     │   │     │▓▓▓▓▓│
│  1  │     │   │     │  2  │
├─────┼─────┤   ├─────┼─────┤
│     │     │   │     │     │
└─────┴─────┘   └─────┴─────┘

┌─────┬─────┐   ┌─────┬─────┐
│     │     │   │     │     │
├─────┼─────┤   ├─────┼─────┤
│▓▓▓▓▓│     │   │     │▓▓▓▓▓│
│  3  │     │   │     │  4  │
└─────┴─────┘   └─────┴─────┘
```

| Key               | Action                          |
|-------------------|---------------------------------|
| `hyper` + `1`     | Top-left quarter                |
| `hyper` + `2`     | Top-right quarter               |
| `hyper` + `3`     | Bottom-left quarter             |
| `hyper` + `4`     | Bottom-right quarter            |

### Thirds (full height)

```
┌───┬───┬───┐   ┌───┬───┬───┐   ┌───┬───┬───┐
│▓▓▓│   │   │   │   │▓▓▓│   │   │   │   │▓▓▓│
│ 5 │   │   │   │   │ 6 │   │   │   │   │ 7 │
│   │   │   │   │   │   │   │   │   │   │   │
└───┴───┴───┘   └───┴───┴───┘   └───┴───┴───┘
```

| Key               | Action                          |
|-------------------|---------------------------------|
| `hyper` + `5`     | Left third                      |
| `hyper` + `6`     | Center third                    |
| `hyper` + `7`     | Right third                     |

### Horizontal Edges

```
┌─────────────────┐
│▓▓▓              │   hyper + [   (far west)
│              ▓▓▓│   hyper + ]   (far east)
└─────────────────┘
```

| Key               | Action                               |
|-------------------|--------------------------------------|
| `hyper` + `[`     | Move to far western edge of screen   |
| `hyper` + `]`     | Move to far eastern edge of screen   |
| `hyper` + `⏎`     | Center window on screen              |

### Multi-Window Layouts

| Key               | Action                                              |
|-------------------|-----------------------------------------------------|
| `hyper` + `n`     | Focused window left half, next window right half    |
| `hyper` + `b`     | Tile all visible windows evenly across screen       |

### Screens

| Key               | Action                          |
|-------------------|---------------------------------|
| `hyper` + `p`     | Move window to previous screen  |
| `hyper` + `\`     | Move window to next screen      |

---

## Window Size

```
         expand ←          expand →
              ↙                ↘
┌───────────────┐       ┌───────────────┐
│  ◄─ H        │       │        L ─►  │
└───────────────┘       └───────────────┘

       compress                expand right only
       ◄── I ──►                    O ──►
```

| Key               | Action                                              |
|-------------------|-----------------------------------------------------|
| `hyper` + `h`     | Expand window left (or expand right if at edge)     |
| `hyper` + `l`     | Expand window right (or expand left if at edge)     |
| `hyper` + `i`     | Compress window width by one column                 |
| `hyper` + `o`     | Expand window right by one column                   |
| `hyper` + `m`     | Maximize window to fill screen                      |
| `hyper` + `z`     | **Undo** last window position/size change           |

---

## Spaces  _(macOS 15+: movement restricted by Apple)_

| Key                  | Action                               |
|----------------------|--------------------------------------|
| `semiHyper` + `l`    | Move focused window to next space    |
| `semiHyper` + `h`    | Move focused window to prev space    |
| `semiHyper` + `u`    | Move **all** windows to next space   |
| `semiHyper` + `p`    | Move **all** windows to prev space   |

---

## Mouse

| Key               | Action                                   |
|-------------------|------------------------------------------|
| `hyper` + `space` | Move cursor to center of active screen   |

---

## App Launchers  (`⌘` `⌥` `⌃` + key)

| Key            | App                  |
|----------------|----------------------|
| `appMash` + `c` | Google Chrome       |
| `appMash` + `t` | Terminal            |
| `appMash` + `f` | Finder              |
| `appMash` + `s` | Slack               |
| `appMash` + `e` | Microsoft Outlook   |

---

## Quick Reference

```
         Hyper  (⌘⌥⌃⇧) — Window Management
┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
│    │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │ 7  │    │    │ -  │ =  │
│    │TL ◤│TR ◥│BL ◣│BR ◢│ ⅓← │ ⅓● │ ⅓→ │    │    │col-│col+│
├────┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┘
│       │    │    │    │    │    │    │    │    │ [  │ ]  │
│       │    │    │    │    │    │    │    │    │ ←far│→far│
├───────┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬──┘
│  caps=⌃  │    │    │    │    │    │    │    │    │ ;  │
│          │    │    │    │    │    │    │    │    │snap│
├──────────┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┴──┬─┘
│             │    │    │    │    │    │    │    │    │
└─────────────┴────┴────┴────┴────┴────┴────┴────┴────┘

Row 1 (numbers): Quarter / Third snaps, Grid col +/-
Row 2 (QWERTY):  [/] = screen edges

         Hyper  (⌘⌥⌃⇧) — QWERTY row
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ q │ w │ e │ r │ t │ y │ u │ i │ o │ p │
│   │   │   │   │   │   │full│ ← │→→ │←scr│
│   │   │   │   │   │   │ht │size│  │prev│
├───┼───┼───┼───┼───┼───┼───┼───┼───┼───┤
│ a │ s │ d │ f │ g │ h │ j │ k │ l │ ; │
│   │   │   │   │   │←──│bot│top│──►│snap│
│   │   │   │   │   │size│hlf│hlf│size│ win│
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│ z │ x │ c │ v │ b │ n │ m │   │   │
│undo│   │   │   │tile│side│max│   │   │
│   │   │   │   │all│by2│   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┘

Arrow keys (hyper):  ← → ↑ ↓  =  Focus nearest window
Space      (hyper):  Mouse → screen center
Return     (hyper):  Center window on screen
\          (hyper):  Move window to next screen

         SemiHyper  (⌘⌥) — Spaces
         h = prev space   l = next space
         p = all prev     u = all next

         AppMash  (⌘⌥⌃) — Launch Apps
         c = Chrome   t = Terminal   f = Finder
         s = Slack    e = Outlook
```
