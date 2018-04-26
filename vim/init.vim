filetype off " required by vundle!
set rtp+=$HOME/.config/nvim/bundles/Vundle.vim
call vundle#begin()
Plugin 'tpope/vim-surround'
call vundle#end()             " required by vundle!
filetype plugin indent on     " required by vundle!

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


