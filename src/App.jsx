import { useState } from "react";
import {
  Droppable,
  Draggable,
  DragDropContext
} from "@hello-pangea/dnd";
import mockData from "./mockData";

function App() {
  const [columns, setColumns] = useState(mockData);

  // drag end function
  const onDragEnd = (result, columns, setColumns) => {

    // If dropped outside droppable, destination will be null
    if (!result.destination) return;
    const { source, destination } = result;
    // console.log(source, destination);

    // If the source droppable is not the same as the destination droppable
    if (source.droppableId !== destination.droppableId) {

      // Get the source and destination columns and items
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];

      console.log(destItems, destColumn);

      // Remove the item from the source column's items at the source index
      const [removed] = sourceItems.splice(source.index, 1);

      // Insert the removed item into the destination column's items at the destination index
      destItems.splice(destination.index, 0, removed);

      // Update the "columns" state variable with the new source and destination items
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });

    }

    // If the source droppable is the same as the destination droppable:
    // else {

    //   // Get the column and items from the source droppable
    //   const column = columns[source.droppableId];
    //   const copiedItems = [...column.items];

    //   // Remove the item from the copied items array at the source index
    //   const [removed] = copiedItems.splice(source.index, 1);

    //   // Insert the removed item into the copied items array at the destination index
    //   copiedItems.splice(destination.index, 0, removed);

    //   console.log(copiedItems);

    //   // Update the "columns" state variable with the new copied items array
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems
    //     }
    //   });
    // }
  };

  return (
    <>
      <div className="flex flex-col justify-center m-5">
        <h1 className="text-center m-10 text-5xl font-semibold">Kanban Board</h1>
        <div className="flex justify-center flex-wrap h-full">
          <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  className="flex flex-col"
                  key={columnId}
                >
                  <h2 className="text-center m-3 text-xl font-semibold">
                    {column.columnName}
                  </h2>
                  <div style={{ margin: 8 }}>
                    <Droppable
                      droppableId={columnId}
                      key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="p-4 h-full w-72 rounded-sm"
                            style={{
                              minHeight: 100,
                              background: snapshot.isDraggingOver
                                ? "lightgrey"
                                : "#EDEDED",
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {

                                    return (
                                      <div className="flex items-center select-none p-5 gap-16 my-1.5 rounded-sm text-gray-50"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={{
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C78",
                                          ...provided.draggableProps.style
                                        }}
                                      >
                                        <div
                                          className="w-5 h-5 bg-slate-700 rounded"
                                          {...provided.dragHandleProps}>
                                        </div>
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

export default App;
