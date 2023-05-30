const modules = [
    '../commonComponents/MaterialSymbol.js',
    '../commonComponents/ColorPicker.js',
    '../commonComponents/CheckBox.js',
    '../commonComponents/RangePicker.js',
    '../commonComponents/TableViewLayout.js',
    './components/BlendModeSelector.js',
    './components/CommentCreateForm.js',
    './components/CommentList.js',
    './components/CommentUpdateForm.js',
    './components/KCanvasView.js',
    './components/Navigation.js',
    './components/People.js',
    './models/Position.tsx',
    './models/UnitModel.tsx',
    './App.jsx',
]

for (let i = 0; i < modules.length; i++) {
    let script = document.createElement('script');
    script.src = modules[i];
    script.type = "text/babel";
    document.head.appendChild(script);
}