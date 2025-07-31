const modules = [
    '../commonComponents/MaterialSymbol.tsx',
    './App.jsx',
    './components/NewCanvasForm.jsx',
    './components/MakeNewCanvasView.tsx',
    './components/DoteMainMenuView.tsx',
    './components/DoteDraw.tsx',
    './components/DoteCanvasView.tsx',
    '../commonComponents/CheckBox.tsx',
    '../commonComponents/ColorPicker.tsx',
    '../commonComponents/RangePicker.tsx',
    '../commonComponents/TableViewLayout.tsx',
    '../commonComponents/ToggleButton.tsx',
    '../commonComponents/TextSelector.tsx',
]

for (let i = 0; i < modules.length; i++) {
    let script = document.createElement('script');
    script.src = modules[i];
    script.type = "text/babel";
    document.head.appendChild(script);
}