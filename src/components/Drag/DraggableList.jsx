import DraggableItem from "./DraggableItem";
import React, {Fragment} from "react";
import {Droppable} from "react-beautiful-dnd";
export const DraggableList = React.memo(function DraggableList({ items }) {
    return <Fragment>
        <Droppable droppableId="list">
            {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {items.map((item, index) => (
                        <DraggableItem item={item} index={index} key={item.id}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </Fragment>


});