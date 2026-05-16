import { useEffect, useMemo, useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  fullVideo?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  type: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "H.I.L.D.A.",
    description: "Human in the loop deployment agent",
    fullDescription:
      "An autonomous AI code review agent that integrates with GitHub to detect security risks, calculate blast radius, and block dangerous pull requests in real-time.",
    tags: ["Next.js", "LangChain", "Supabase", "TypeScript"],
    fullVideo: "https://www.youtube.com/embed/e6rHv_4_W6o",
    githubUrl: "https://github.com/harshit110927/hilda",
    type: "Case Study",
  },
  {
    id: "2",
    title: "OnBoardFlow",
    description: "Multiplayer code editor with WebSocket sync",
    fullDescription:
      "A real-time collaborative code editor supporting multiple cursors, syntax highlighting, and instant synchronization across connected users.",
    tags: ["NextJS", "TypeScript", "Supabase", "PostgreSQL"],
    liveUrl: "https://onboardflow.xyz",
    fullVideo: "https://www.youtube.com/embed/Lpsfs9r_vOM",
    githubUrl: "https://github.com/harshit110927/onboardflow",
    type: "Product",
  },
  {
    id: "3",
    title: "Realtime RAG assistant for teams",
    description: "Enterprise-specific tech stack query resolution",
    fullDescription:
      "Enterprises often struggle with onboarding to custom internal stacks. This assistant resolves stack-specific questions by grounding answers in prior team conversations.",
    tags: ["RAG", "Python", "Vector DB", "LLM"],
    fullVideo: "https://www.youtube.com/embed/xTmmjG_vyxI",
    githubUrl: "https://github.com/harshit110927/RAGrealTime",
    type: "Research Build",
  },
  {
    id: "4",
    title: "CRAG-Lite",
    description: "Hybrid implementation of CRAG research paper",
    fullDescription: "An experimental implementation focused on improving retrieval quality and mitigating hallucinations.",
    tags: ["Python", "RAG", "Hallucinations", "Docker"],
    type: "In Progress",
  },
];

const getYoutubeId = (url: string) => {
  const match = url.match(/embed\/([^?]+)/);
  return match?.[1] ?? "";
};

const Projects = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const iframeSrc = useMemo(() => {
    if (!activeVideoId) return "";
    return `https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`;
  }, [activeVideoId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideoId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="section section-divider" id="projects">
      <div className="content-wrap">
        <p className="section-number fade-in">01</p>
        <h2 className="section-title fade-in">Selected Work</h2>

        <div className="project-list">
          {projects.map((project) => {
            const videoId = project.fullVideo ? getYoutubeId(project.fullVideo) : "";

            return (
              <article key={project.id} className="project-row fade-in">
                <div className="project-hover-bg" />
                <div className="project-left">
                  <p className="project-type">{project.type}</p>
                  <h3 className="project-name">{project.title}</h3>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {videoId && (
                    <button className="play-pill" onClick={() => setActiveVideoId(videoId)}>
                      ▶ Play Demo
                    </button>
                  )}
                </div>
                <div className="project-right">
                  <p>{project.fullDescription || project.description}</p>
                  <div className="project-links">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                <span className="project-arrow">→</span>
              </article>
            );
          })}
        </div>
      </div>

      <div
        className={`video-overlay ${activeVideoId ? "open" : ""}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveVideoId(null);
        }}
      >
        <div className="video-modal">
          <button className="video-close" onClick={() => setActiveVideoId(null)} aria-label="Close video">
            ×
          </button>
          <div className="video-frame-wrap">
            {activeVideoId && <iframe src={iframeSrc} title="Project demo" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
