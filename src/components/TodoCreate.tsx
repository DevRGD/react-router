import { useState } from 'react';
import { Form, useActionData } from 'react-router';

export default function TodoCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const actionData = useActionData() as any;
  const error = actionData?.error ? actionData.error : null;

  return (
    <Form method="post" encType="multipart/form-data" className="space-y-4 max-w-lg">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">File (optional)</label>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full file:px-4 file:py-2 file:border-0 file:rounded file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-[#CA4246] text-white rounded hover:bg-red-700 transition">
        Save Todo
      </button>
    </Form>
  );
}
