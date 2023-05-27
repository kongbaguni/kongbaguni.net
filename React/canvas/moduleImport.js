const modules = [
    '../commonComponents/MaterialSymbol.tsx',
    '../commonComponents/ColorPicker.tsx',
    '../commonComponents/CheckBox.tsx',
    '../commonComponents/RangePicker.tsx',
    '../commonComponents/ToggleButton.tsx',
    '../commonComponents/TableViewLayout.tsx',
    './models/Position.tsx',
    './models/UnitModel.tsx',
    './App.jsx',
    './components/BlendModeSelector.tsx',
    './components/VideoPreview.tsx',
    './components/KCanvasView.tsx',
    './components/Navigation.js',
    './components/People.js',
]

for (let i = 0; i < modules.length; i++) {
    let script = document.createElement('script');
    script.src = modules[i];
    script.type = "text/babel";
    document.head.appendChild(script);
}