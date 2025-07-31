const modules = [
    '../commonComponents/MaterialSymbol.tsx',
    '../commonComponents/CheckBox.tsx',
    '../commonComponents/ColorPicker.tsx',
    '../commonComponents/RangePicker.tsx',
    '../commonComponents/TableViewLayout.tsx',
    '../commonComponents/ToggleButton.tsx',
    './components/BlendModeSelector.tsx',
    './components/KCanvasView.tsx',
    './components/VideoPreview.tsx',
    './App.jsx',
]

for (let i = 0; i < modules.length; i++) {
    let script = document.createElement('script');
    script.src = modules[i];
    script.type = "text/babel";
    document.head.appendChild(script);
}