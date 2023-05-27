const modules = [
    '../commonComponents/MaterialSymbol.js',
    '../commonComponents/ColorPicker.tsx',
    '../commonComponents/CheckBox.tsx',
    '../commonComponents/RangePicker.js',
    './App.jsx',
    './components/BlendModeSelector.tsx',
    './components/TableViewLayout.js',
    './components/KCanvasView.js',
    './components/Navigation.js',
    './components/People.js',
    './components/ToggleButton.js',
    './components/VideoPreview.js',
]

for (let i = 0; i < modules.length; i++) {
    let script = document.createElement('script');
    script.src = modules[i];
    script.type = "text/babel";
    document.head.appendChild(script);
}