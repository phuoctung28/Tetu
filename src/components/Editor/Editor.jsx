import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import InlineCode from '@editorjs/inline-code'
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import Paragraph from "@editorjs/paragraph";
import Underline from '@editorjs/underline';
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
    // const ejInstance = useRef();
    // const initEditor = () => {
    //     const editor = new EditorJS({
    //         holder: 'editorjs',
    //         onReady: () => {
    //             ejInstance.current = editor;
    //             // new Undo({ editor });
    //             new DragDrop(editor);
    //         },
    //         autofocus: true,
    //         data: DEFAULT_INITIAL_DATA,
    //         onChange: async () => {
    //             let content = await editor.saver.save();
    //             console.log(content);
    //         },
    //         tools: {
    //             header: {
    //                 class: Header,
    //                 inlineToolbar: ['link'],
    //                 shortcut: 'CTRL+SHIFT+H',
    //             },
    //             table: Table,
    //             underline: {
    //                 class: Underline,
    //                 shortcut: 'CTRL+U',
    //             },
    //             marker: {
    //                 class: Marker,
    //                 shortcut: 'CTRL+M',
    //             },
    //             inlineCode: {
    //                 class: InlineCode,
    //                 shortcut: 'CTRL+E'
    //             },
    //             list: List,
    //             code: Code,
    //             image: Image,
    //             checklist: CheckList,
    //             paragraph: {
    //                 class: Paragraph,
    //                 inlineToolbar: true,
    //                 config: {
    //                     placeholder: 'Press "TAB" for commands...'
    //                 }
    //             },
    //         },
    //     });
    // };
    // useEffect(() => {
    //     if (ejInstance.current === null) {
    //         initEditor();
    //     }

    //     return () => {
    //         ejInstance?.current?.destroy();
    //         ejInstance.current = null;
    //     };
    // }, []);

    useEffect(() => {
        setEditorValue(editorData);
    }, [editorData]);

    const handleChange = (value) => {
        setEditorValue(value);
        setNoteContent(value);
    };

    return (
        <div className="editor-container">
            {/* <div holder='editorjs' id='editorjs'></div> */}
            <ReactQuill
                value={editorValue}
                onChange={handleChange}
                placeholder="Enter here"
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        // ['image'],
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
                    // 'image',
                ]}
            />
        </div>
    );
};

export default TetuEditor;
