import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const List = ({
  todo,
  handleToggleComplete,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  return (
    <li
      key={todo.id}
      className={`border border-gray-300 flex justify-between p-2 w-[330px] rounded-md
                ${todo.completed ? "line-through text-gray-500" : "none"}`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleComplete(todo.id)}
          className="h-5 w-5"
        />
        <span>{todo.text}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleEditTodo(todo)}
          title="Edit"
          disabled={todo.completed}
        >
          <AiFillEdit
            size={20}
            className={` ${todo.completed ? "text-gray-400" : "text-blue-500"}`}
          />
        </button>
        <button onClick={() => handleDeleteTodo(todo.id)} title="Delete">
          <MdDelete size={20} className="text-red-500" />
        </button>
      </div>
    </li>
  );
};

export default List;
