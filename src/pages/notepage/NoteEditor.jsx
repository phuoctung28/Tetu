import { theme, Input, } from 'antd';
import React, { useState, useEffect } from 'react';
import './note_editor.css';
import Metadata from '../../components/collapse/Metadata';

const { TextArea } = Input;

const Notebook = ({note}) => {
   const { token: { colorBgContainer }, } = theme.useToken();
    console.log(note)
   const [title, setTitle] = useState(note?.title);
   useEffect(() => {
      // This will run when the page first loads and whenever the title changes
      document.title = title;
   }, [title]);

   const changeTitle = (event) => {
      setTitle(event.target.value);
   };

   const handleKeyUp = (event) => {
      if (event.keyCode === 13) {
         event.preventDefault();
         event.target.blur();
      }
   }
   return (
      <div style={{ padding: 40, background: colorBgContainer, }}>
         <div className='note-title-container'>
            <Input
               value={title}
               className="note-title"
               onChange={changeTitle}
               onPressEnter={handleKeyUp}
               bordered={false} />
         </div>
         <Metadata />
         <div className='text-editor-container'>
            <TextArea
               rows={10}
               className='text-editor'
               placeholder='Type "/" for command'
               defaultValue={note.content}
               bordered={false} />;
         </div>
      </div>

   );
};
export default Notebook;