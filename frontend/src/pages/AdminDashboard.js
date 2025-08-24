import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getAllAssignments, updateAssignment, shuffleAssignments } from '../services/apiService';
import io from 'socket.io-client';
import './AdminDashboard.css';

const socket = io("http://localhost:3001");

function AdminDashboard() {
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);

  const organizeDataIntoColumns = (data) => {
    const tables = {};
    for (let i = 1; i <= 8; i++) {
      tables[`table-${i}`] = { name: `โต๊ะ ${i}`, items: [] };
    }
    data.forEach(item => {
      if (tables[`table-${item.table_number}`]) {
        tables[`table-${item.table_number}`].items.push(item);
      }
    });
    setColumns(tables);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllAssignments();
      organizeDataIntoColumns(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    socket.on('assignmentUpdated', (updatedData) => {
        console.log("Kanban received update!");
        organizeDataIntoColumns(updatedData);
    });

    socket.on('assignmentsShuffled', () => {
        console.log("Shuffled! Refreshing board...");
        fetchData();
    });

    return () => {
        socket.off('assignmentUpdated');
        socket.off('assignmentsShuffled');
    };
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    // optimistic UI update
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    
    if (source.droppableId !== destination.droppableId) {
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: { ...sourceColumn, items: sourceItems },
            [destination.droppableId]: { ...destColumn, items: destItems },
        });
    } else {
        sourceItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: { ...sourceColumn, items: sourceItems },
        });
    }

    // Call API to update backend
    const newTableNumber = parseInt(destination.droppableId.split('-')[1]);
    updateAssignment(draggableId, { table_number: newTableNumber })
      .catch(err => {
        console.error('Failed to update assignment:', err);
        // Revert UI on error
        fetchData();
      });
  };

  const handleCheckIn = (assignmentId) => {
    updateAssignment(assignmentId, { status: 'Arrived' });
  };
  
  const handleShuffle = () => {
    if(window.confirm('คุณต้องการสุ่มโต๊ะสำหรับผู้สมัครในรอบเวลาที่ 1 ใช่หรือไม่?')){
        shuffleAssignments(1).then(() => alert('สุ่มโต๊ะเรียบร้อยแล้ว!'));
    }
  };

  if (loading) return <div>Loading Admin Dashboard...</div>

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard - Interview Management</h1>
        <button onClick={handleShuffle} className="shuffle-button">Shuffle Timeslot 1</button>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board">
          {Object.entries(columns).map(([columnId, column]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{column.name}</h2>
                  <div className="kanban-items">
                    {column.items.map((item, index) => (
                      <Draggable draggableId={String(item.id)} index={index} key={item.id}>
                        {(provided, snapshot) => (
                          <div
                            className={`applicant-card ${snapshot.isDragging ? 'dragging' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{item.applicant_name}</p>
                            <div className="card-footer">
                                <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                                {item.status === 'Scheduled' && (
                                    <button onClick={() => handleCheckIn(item.id)} className="check-in-btn">Check-in</button>
                                )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default AdminDashboard;