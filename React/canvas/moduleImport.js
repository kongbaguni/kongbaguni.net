const modules = [
    './App.jsx',
    './components/BlendModeSelector.js',
    './components/CheckBox.js',
    './components/ColorPicker.js',
    './components/CommentCreateForm.js',
    './components/CommentList.js',
    './components/CommentUpdateForm.js',
    './components/TableViewLayout.js',
    './components/KCanvasView.js',
    './components/Navigation.js',
    './components/People.js',
    './components/RangePicker.js',
    './components/ToggleButton.js',
    './components/VideoPreview.js'
]

for (let i = 0; i < modules.length; i++) {
    let script = document.createElement('script');
    script.src = modules[i];
    script.type = "text/babel";
    document.head.appendChild(script);
}