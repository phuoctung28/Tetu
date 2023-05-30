import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Editor.css"
const TetuEditor = () => {
    const [editorValue, setEditorValue] = useState('');

    const handleChange = (value) => {
        console.log(value)
        setEditorValue(value);
    };
    return (
        <div className="editor-container">
            <ReactQuill
                value={editorValue}
                onChange={handleChange}
                placeholder={"Enter here"}
                modules={{
                    toolbar: [
                        [{header: [1, 2, false]}],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{list: 'ordered'}, {list: 'bullet'}],
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
