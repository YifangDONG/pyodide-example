import React, { useState, useEffect } from 'react';
import { loadPyodide } from 'pyodide';

const PyodideComponent = () => {
    const [pyodide, setPyodide] = useState(null);
    const [output, setOutput] = useState('Initializing...\n');

    const [snowballstemmerInput, setSnowballstemmerInput] = useState('go going gone goes did done do');
    const [imageSrc, setImageSrc] = useState('initial-image.jpg');


    useEffect(() => {
        async function initializePyodide() {
            const pyodideInstance = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full' });
            setPyodide(pyodideInstance);
            setOutput(preOutput => preOutput + "ready to use.\n"); // Question why ready to use is added twice ?
        }
        initializePyodide();
    }, []);

    const runSnowballStemmer = async (event) => {
        //https://pypi.org/project/snowballstemmer/
        event.preventDefault();
        pyodide.globals.set("alo_analyze", snowballstemmerInput);
        try {
            await pyodide.loadPackage("micropip");
            const micropip = pyodide.pyimport("micropip");
            await micropip.install("snowballstemmer");
            await pyodide.runPython(`
            import snowballstemmer
            import People
            stemmer = snowballstemmer.stemmer('english')
            alo_result = stemmer.stemWords(alo_analyze.split())
            `);

            setOutput(preOutput => preOutput + pyodide.globals.get('alo_result') + "\n");
        } catch (error) {
            setOutput(`Error: ${error}`);
        }
    };

    const createMatplotlibFigure = async () => {
        pyodide.loadPackage(['matplotlib']).then(() => {
            pyodide.runPython(`
                  import matplotlib.pyplot as plt
                  import io, base64
  
                  fig, ax = plt.subplots()
                  ax.plot([1,3,2])
  
                  buf = io.BytesIO()
                  fig.savefig(buf, format='png')
                  buf.seek(0)
                  img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')`
            );
            setImageSrc(pyodide.globals.get('img_str'));
        });
    }

    return (
        <div>
            <h1>Pyodide Package examples</h1>
            <div>
                <h2>Ex1: NPL</h2>
                <form onSubmit={runSnowballStemmer}>
                    <label htmlFor="textToAnalyze">String to analyze:</label>
                    <br />
                    <textarea
                        id="textToAnalyze"
                        rows={10}
                        cols={50}
                        value={snowballstemmerInput}
                        onChange={(event) => setSnowballstemmerInput(event.target.value)}
                    />
                    <br />
                    <input type="submit" value="Run Snowball Stemmer Analyze" />
                </form>
                <div>Results: </div>
                <textarea
                    value={output}
                    rows={10}
                    cols={50}
                    disabled
                />
            </div>
            <div>
                <h2>Ex2: plot</h2>
                <button onClick={createMatplotlibFigure}>Create MatPlotLib Figure</button>
                <div><img src={imageSrc} alt="matplot figure" /></div>
            </div>
        </div>
    );
};

export default PyodideComponent;
