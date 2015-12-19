" JGo

if filereadable(expand("~/.vimrc.bundles"))
  source ~/.vimrc.bundles
endif


" Settings {{{
set modelines=1 " Allow modelines (i.e. executable comments)
set switchbuf+=usetab
set hidden
set mouse=a " Enable mouse use in all modes


" Search
set incsearch                   " Automatically begins searching as you type
set hlsearch                    " highlight matches
set ignorecase                  " searches are case insensitive...
set smartcase                   " ... unless they contain at least one capital letter
set infercase                   " Use the correct case when autocompleting


syntax enable                   " Turn on syntax highlighting allowing local overrides
set background=dark
" let g:solarized_termcolors=16
" colorscheme solarized
colorscheme colorsbox


" NerdTree Settings
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
