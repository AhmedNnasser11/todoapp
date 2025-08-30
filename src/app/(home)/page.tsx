import TodoColumn from "@/components/TodoColumn";
import Header from "./Header";
import "./homeStyles.css";
import TodoItem from "@/components/todoItem";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="todo-column-container">
        <TodoColumn title="To Do">
          <TodoItem />
          <TodoItem />
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </TodoColumn>
        <TodoColumn title="In Progress">
          <TodoItem />
          <TodoItem />
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </TodoColumn>
        <TodoColumn title="Done">
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </TodoColumn>
      </div>
    </div>
  );
}
