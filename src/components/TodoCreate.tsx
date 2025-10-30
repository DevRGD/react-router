import { useState } from 'react';

export default function TodoCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) formData.append('file', file);

    const res = await fetch('http://localhost:8080/todo', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('Todo created successfully!');
      setTitle('');
      setDescription('');
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">File (optional)</label>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </div>
      <button type="submit" className="px-4 py-2 bg-[#CA4246] text-white rounded hover:bg-red-700 transition">
        Save Todo
      </button>
    </form>
  );
}
