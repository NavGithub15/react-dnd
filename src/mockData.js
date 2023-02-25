const tasks = [
    { id: "task-1", content: "Groceries" },
    { id: "task-2", content: "Laundry" },
    { id: "task-3", content: "Walk the Dog" },
    { id: "task-4", content: "Study" },
    { id: "task-5", content: "Workout" }
  ];
  
  const mockData = {
    "column1": {
      id: "column-1",
      columnName: "To Do",
      items: tasks
    },
    "column2": {
      id: "column-2",
      columnName: "In Progress",
      backgroundColor: "lightYellow",
      items: []
    },
    "column3": {
      id: "column-3",
      backgroundColor: "lightGreen",
      columnName: "Completed",
      items: []
    }
  };
export default mockData;