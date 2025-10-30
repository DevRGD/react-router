import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function TodoDetail() {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Array>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/todo/${id}`)
      .then((res) => res.json())
      .then((data) => setTodo(data.data));
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm max-w-xl">
      <h2 className="text-xl font-semibold text-[#CA4246]">{todo.title}</h2>
      <p className="text-slate-700 mt-2">{todo.description}</p>
      <p className="text-slate-500 mt-1 text-sm">Status: {todo.status}</p>
      {todo.file && (
        <a
          href={todo.file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#CA4246] underline text-sm mt-2 inline-block"
        >
          {todo.file.originalName}
        </a>
      )}
    </div>
  );
}
