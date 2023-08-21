import React, { useState, useEffect } from 'react';
import { loadPyodide } from 'pyodide';

const PyodideComponent = () => {
    const [pyodide, setPyodide] = useState(null);
    const [output, setOutput] = useState('Initializing...\n');
    const [pythonCode, setPythonCode] = useState('');

    useEffect(() => {
        async function initializePyodide() {
            const pyodideInstance = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full' });
            setPyodide(pyodideInstance);
            setOutput(preOutput => preOutput + "ready to use.\n"); // Question why ready to use is added twice ?
        }
        initializePyodide();
    }, []);

    const runPythonCode = async () => {
        try {
            const result = await pyodide.runPython(pythonCode); // or pyodide.runPythonAsync()
            setOutput(preOutput => preOutput + result + "\n");
        } catch (error) {
            setOutput(`Error: ${error}`);
        }
    };

    return (
        <div>
            <h1>Pyodide Component</h1>
            <textarea
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
                placeholder="Enter Python code here"
                rows={10}
                cols={50}
            />
            <br />
            <button onClick={runPythonCode}>Run Python Code</button>
            <div>Results: </div>
            <textarea
                value={output}
                rows={10}
                cols={50}
                disabled
            />
        </div>
    );
};

export default PyodideComponent;
