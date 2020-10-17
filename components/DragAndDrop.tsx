import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? '#4299e1' : 'lightgrey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : '#f2f2f2',
  padding: grid,
  // width: 250,
});

type IProps = {
  titleItems: string;
  titleSelected: string;
  items: any[];
  selected: any[];
  setItems: (list: any[]) => void;
  setSelected: (list: any[]) => void;
};

export function DragAndDrop(props: IProps) {
  // const [items, setItems] = useState(props.items);
  // const [selected, setSelected] = useState(props.selected);

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */

  const getList = (id: any) => {
    if (id === 'droppable') {
      return props.items;
    } else if (id === 'droppable2') {
      return props.selected;
    } else {
      return [];
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index,
      );

      if (source.droppableId === 'droppable2') {
        props.setSelected(items);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination,
      );

      props.setItems(result.droppable);
      props.setSelected(result.droppable2);
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: any, snapshot: any) => (
          <div
            className="w-1/2"
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <div className="text-center font-bold mb-2">{props.titleItems}</div>
            {props.items.map((item: any, index: any) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: any, snapshot: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="droppable2">
        {(provided: any, snapshot: any) => (
          <div
            className="w-1/2"
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <div className="text-center font-bold mb-2">
              {props.titleSelected}
            </div>
            {props.selected.map((item: any, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided: any, snapshot: any) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
