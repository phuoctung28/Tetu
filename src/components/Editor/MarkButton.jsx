import React from 'react';
import { useSlate } from 'slate-react';

import { Button, Icon } from './components';
import { isMarkActive, toggleMark } from './helpers';

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    );
};

export default MarkButton;
