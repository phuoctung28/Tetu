import React from 'react';
import {Draggable} from "react-beautiful-dnd";

const DraggableItem = ({item, index}) => {
    return (
        <Draggable draggableId={item.id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {item.content}
                </div>
            )}
        </Draggable>
    )
};

export default DraggableItem;