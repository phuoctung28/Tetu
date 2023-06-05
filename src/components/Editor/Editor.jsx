import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

const TetuEditor = ({ editorData, setNoteContent }) => {
    const [editorValue, setEditorValue] = useState('');

    useEffect(() => {
        setEditorValue(editorData);
    }, [editorData]);

    const handleChange = (value) => {
        setEditorValue(value);
        setNoteContent(value);
    };

    return (
        <div className="editor-container">
            <ReactQuill
                value={editorValue}
                onChange={handleChange}
                placeholder="Enter here"
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['image'],
                    ],
                }}
                formats={[
                    'header',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'blockquote',
                    'list',
                    'bullet',
                    'link',
                    'image',
                ]}
            />
        </div>
    );
};

export default TetuEditor;
