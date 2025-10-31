import { Link, useLoaderData, Form } from 'react-router';

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

interface TodoDetailData {
  data: Todo;
}

export default function TodoDetail() {
  const { data: todo } = useLoaderData() as TodoDetailData;

  if (!todo) {
    return <p>Todo not found.</p>;
  }

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

      <div className="flex gap-4 mt-6">
        <Link
          to={`/todos/${todo._id}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </Link>
        <Form
          method="post"
          action={`/todos/${todo._id}/delete`}
          onSubmit={(e) => {
            if (!window.confirm('Are you sure you want to delete this todo?')) {
              e.preventDefault();
            }
          }}
        >
          <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
}
