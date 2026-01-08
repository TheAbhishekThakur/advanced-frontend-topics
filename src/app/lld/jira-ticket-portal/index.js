// JIRA Ticket UI with move on state to another

import { useState } from "react";
import { completed, inProgress, todo } from "./constant";
import "./styles.css";

export default function App() {
  const [ticket, setTicket] = useState({
    todo: todo,
    inProgress: inProgress,
    completed: completed,
  });

  const onTodoClick = (index) => {
    const todoArr = [...ticket.todo];
    const inProgressArr = [...ticket.inProgress];

    // Logic to push data in inProgress arr
    const inProgressItem = todoArr[index];
    inProgressArr.push(inProgressItem);

    // Logic to delete data from todo arr
    todoArr.splice(index, 1);

    setTicket({ ...ticket, todo: todoArr, inProgress: inProgressArr });
  };

  const onInProgressClick = (index) => {
    const inProgressArr = [...ticket.inProgress];
    const completedArr = [...ticket.completed];

    // Logic to push data in completed arr
    const inProgressItem = inProgressArr[index];
    completedArr.push(inProgressItem);

    // Logic to delete data from inprogress arr
    inProgressArr.splice(index, 1);

    setTicket({
      ...ticket,
      inProgress: inProgressArr,
      completed: completedArr,
    });
  };

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <div style={{ border: "1px solid black", padding: "0px 12px" }}>
        <h3>To Do</h3>
        <ul style={{ padding: "12px" }}>
          {ticket.todo &&
            ticket.todo.map((item, index) => (
              <li key={item.id} onClick={() => onTodoClick(index)}>
                {item.title}
              </li>
            ))}
        </ul>
      </div>
      <div style={{ border: "1px solid black", padding: "0px 12px" }}>
        <h3>In Progress</h3>
        <ul style={{ padding: "12px" }}>
          {ticket.inProgress &&
            ticket.inProgress.map((item, index) => (
              <li key={item.id} onClick={() => onInProgressClick(index)}>
                {item.title}
              </li>
            ))}
        </ul>
      </div>
      <div style={{ border: "1px solid black", padding: "0px 12px" }}>
        <h3>Completed</h3>
        <ul style={{ padding: "12px" }}>
          {ticket.completed &&
            ticket.completed.map((item) => <li key={item.id}>{item.title}</li>)}
        </ul>
      </div>
    </div>
  );
}
