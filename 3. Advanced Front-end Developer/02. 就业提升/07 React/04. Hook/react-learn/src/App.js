import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import "./App.css";
import "animate.css";

export default function App() {
  const MyClassNames = {
    exitActive: "animate__fadeOutLeft",
    enterActive: "animate__fadeInRight",
    appear: "animate__fadeInRight",
  };
  const [taskslist, setTaskslist] = useState([
    { id: uuid(), name: "task 1" },
    { id: uuid(), name: "task 2" },
    { id: uuid(), name: "task 3" },
    { id: uuid(), name: "task 4" },
  ]);
  return (
    <div className="container">
      <TransitionGroup appear>
        {taskslist.map((t) => (
          <CSSTransition timeout={1000} key={t.id} classNames={MyClassNames}>
            <div className="animate__animated animate__fast">
              <span>{t.name}</span>
              <button
                onClick={() => {
                  const newTasksList = taskslist.filter(
                    (task) => task.id !== t.id
                  );
                  setTaskslist(newTasksList);
                }}
              >
                删除
              </button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div className="addBtn">
        <button
          onClick={() => {
            let name = window.prompt("请输入一个任务");
            setTaskslist([...taskslist, { id: uuid(), name: name }]);
          }}
        >
          添加一个任务
        </button>
      </div>
    </div>
  );
}
