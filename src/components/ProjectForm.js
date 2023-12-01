import { useState } from "react";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [manager, setManager] = useState("");
  const [dev, setDev] = useState("");
  const [error, setError] = useState(null);

  const handelSubmit = async (e) => {
    e.preventDefault();

    // data
    const project = { title, tech, budget, duration, manager, dev };

    // post req
    const res = await fetch("http://localhost:5000/api/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    const json = await res.json();

    // !res.ok , set error
    if (!res.ok) {
      setError(json.error);
    }

    // res.ok , reset
    if (res.ok) {
      setTitle("");
      setTech("");
      setBudget("");
      setDev("");
      setDuration("");
      setManager("");
      setError(null);

      console.log("New project has been added to the database", json);
    }
  };

  return (
    <form className="project-form flex flex-col gap-5">
      <h2 className="text-4xl font-medium text-sky-400 mb-10">
        Add a new project
      </h2>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="title"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Project title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="e.g e-commerce website"
          id="title"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="tech"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type="text"
          placeholder="e.g node.js, react, redux etc."
          id="tech"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="budget"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Budget (USD)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          placeholder="e.g 500 "
          id="budget"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="duration"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Duration (week)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="e.g 5"
          id="duration"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="manager"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          type="manager"
          placeholder="e.g Sami"
          id="manager"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <div className="form-controller flex flex-col gap-2">
        <label
          htmlFor="dev"
          className="cursor-pointer text-slate-300 hover:text-sky-400 duration-300"
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          type="number"
          placeholder="e.g 5"
          id="dev"
          className="bg-transparent border border-slate-500 py-3 px-5 rounded-lg outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 text-slate-900 py-3 rounded-lg hover:bg-sky-50 duration-300"
        onClick={handelSubmit}
      >
        Add project
      </button>
      {error && (
        <p className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default ProjectForm;
