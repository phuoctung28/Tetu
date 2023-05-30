import React, {useState} from 'react';
import {DraggableList} from "./DraggableList";
import {DragDropContext} from "react-beautiful-dnd";

const DraggableContainer = (props) => {
    const [items, setItems] = useState(10);
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const itemReordered = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(itemReordered);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <DraggableList items={items}/>
        </DragDropContext>
    )
}

export default DraggableContainer;