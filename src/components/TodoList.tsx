import { useEffect, useState } from 'react';

interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  file?: {
    url: string;
    originalName: string;
  };
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/todo/list')
      .then((res) => res.json())
      .then((data) => setTodos(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div key={todo._id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">{todo.title}</h2>
            <p className="text-sm text-slate-600">{todo.description}</p>
            <p className="text-xs mt-1 text-slate-500">Status: {todo.status}</p>
          </div>
          {todo.file && (
            <a
              href={todo.file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CA4246] underline text-sm"
            >
              {todo.file.originalName}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
