// File: src/components/ProjectSection.jsx
export default function ProjectSection({ title, weekRange, coreQuestions, steps }) {
    return (
      <div className="mb-8">
        <div className="text-project-timeline mb-3">Weeks {weekRange}</div>
        <h2 className="text-project-subheading mb-3">{title}</h2>
        
        <div className="mb-4">
          <div className="text-project-core mb-3">Core Questions to Ponder:</div>
          <ul className="list-none pl-4 space-y-2">
            {coreQuestions.map((question, idx) => (
              <li key={idx} className="text-project-body">{question}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <div className="text-project-core mb-3">Steps:</div>
          <ol className="list-decimal pl-8 space-y-2">
            {steps.map((step, idx) => (
              <li key={idx} className="text-project-body mb-2">{step}</li>
            ))}
          </ol>
        </div>
        <div className="h-[3px] w-full bg-blue-100 opacity-30 my-5"></div>
      </div>
    );
  }
  