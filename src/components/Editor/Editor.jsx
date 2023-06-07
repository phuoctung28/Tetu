import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import Table from '@editorjs/table'
import List from '@editorjs/list'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Quote from '@editorjs/quote'
import CheckList from '@editorjs/checklist'
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "This is my awesome editor!",
                "level": 1
            }
        },
    ]
}

const TetuEditor = ({ editorData, setNoteContent }) => {
    const [editorValue, setEditorValue] = useState('');
    const ejInstance = useRef();

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            onChange: async () => {
                let content = await editor.saver.save();
                console.log(content);
            },
            tools: {
                header: Header,
                table: Table,
                list: List,
                linkTool: LinkTool,
                image: Image,
                quote: Quote,
                checklist: CheckList,
                paragraph: {
                    config: {
                        placeholder: 'Tell your story...'
                    }
                }
            },
        });
    };
    useEffect(() => {
        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);
    useEffect(() => {
        setEditorValue(editorData);
    }, [editorData]);

    const handleChange = (value) => {
        setEditorValue(value);
        setNoteContent(value);
    };

    return (
        <div className="editor-container">
            {/* <div id='editorjs'></div> */}
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
