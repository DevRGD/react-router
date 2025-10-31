import { Form, useActionData, useLoaderData } from 'react-router';

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

export default function TodoEdit() {
  const { data: todo } = useLoaderData() as TodoDetailData;
  const actionData = useActionData() as any;
  const error = actionData?.error ? actionData.error : null;

  return (
    <Form method="post" encType="multipart/form-data" className="space-y-4 max-w-lg bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-[#CA4246] mb-4">Edit Todo</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label className="block font-medium mb-1">Title</label>
        <input type="text" name="title" defaultValue={todo.title} required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea name="description" defaultValue={todo.description} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium mb-1">Status</label>
        <select name="status" defaultValue={todo.status} className="w-full p-2 border rounded">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Replace File (optional)</label>
        {todo.file && <p className="text-sm text-slate-600 mb-2">Current file: {todo.file.originalName}</p>}
        <input
          type="file"
          name="file"
          className="w-full file:px-4 file:py-2 file:border-0 file:rounded file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
        />
      </div>

      <button type="submit" className="px-4 py-2 bg-[#CA4246] text-white rounded hover:bg-red-700 transition">
        Save Changes
      </button>
    </Form>
  );
}
