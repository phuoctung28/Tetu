import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function PdfViewerComponent(props) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <Viewer
                    fileUrl={props.pdfUrl}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </div>
        </Worker>
    )
}

export default PdfViewerComponent