export default function About() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-[#CA4246] mb-4">About This App</h1>
      <p className="text-lg text-slate-700 max-w-2xl">
        This is a simple and intuitive Todo application built with React, React Router v7, and a Node.js backend,
        allowing you to efficiently create, manage, and track tasks with optional file attachments.
      </p>
    </div>
  );
}
