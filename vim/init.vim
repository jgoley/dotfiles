set nocompatible
set encoding=utf-8
set guifont=Knack\ Nerd\ Font:h11

if filereadable(expand("~/.vimrc.bundles"))
  source ~/.vimrc.bundles
endif

set clipboard=unnamed           "       Use System clipboard

nmap , $p
map <C-c> <Esc>
map <C-s>:w<CR> <Esc>
map <C-w> zz
map <C-h> gT
map <C-l> gt
map <C-]> gT
map <C-l> gt
map <C-\> :NERDTreeToggle<CR>
map <C-j> o<Esc>
map <C-k> O<Esc>
map <C-k>:NERDTree-P<CR>

cmap <C-k> <Up>
cmap <C-j> <Down>
cmap <C-l> <Right>
cmap <C-h> <Left>


