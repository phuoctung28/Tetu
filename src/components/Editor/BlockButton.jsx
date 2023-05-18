import React from 'react';
import { useSlate } from 'slate-react';

import { Button, Icon } from './components';
import { isBlockActive, toggleBlock, TEXT_ALIGN_TYPES, LIST_TYPES } from './helpers';

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            )}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            <Icon>{icon}</Icon>
        </Button>
    );
};

export default BlockButton;
