const modules = [
    '../commonComponents/MaterialSymbol.js',
    './App.jsx',
    './components/CommentCreateForm.js',
    './components/CommentList.js',
    './components/CommentUpdateForm.js',
]

for (let i = 0; i < modules.length; i++) {
    let script = document.createElement('script');
    script.src = modules[i];
    script.type = "text/babel";
    document.head.appendChild(script);
}