import { Link, useLoaderData } from 'react-router';

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
  const todos = useLoaderData() as Todo[];

  return (
    <div className="space-y-4">
      {todos.length === 0 ? (
        <p>No todos found. Go create one!</p>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">
                <Link to={`/todos/${todo._id}`} className="hover:underline">
                  {todo.title}
                </Link>
              </h2>
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
        ))
      )}
    </div>
  );
}
