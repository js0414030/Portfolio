import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";
import { 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiMongodb, 
  SiDocker, 
  SiGit, 
  SiGithub,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMysql,
  SiRender,
  SiVercel,
  SiCplusplus
} from "react-icons/si";

const skills = [
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500", url: "https://nodejs.org/" },
  { name: "HTML", icon: SiHtml5, color: "text-orange-500", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", icon: SiCss3, color: "text-blue-500", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Python", icon: SiPython, color: "text-blue-600", url: "https://www.python.org/" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-600", url: "https://www.mongodb.com/" },
  { name: "Git", icon: SiGit, color: "text-red-500", url: "https://git-scm.com/" },
  { name: "GitHub", icon: SiGithub, color: "text-gray-600", url: "https://github.com/" },
  { name: "Docker", icon: SiDocker, color: "text-blue-500", url: "https://www.docker.com/" },
  { name: "MySQL", icon: SiMysql, color: "text-blue-700", url: "https://www.mysql.com/" },
  { name: "React", icon: SiReact, color: "text-cyan-500", url: "https://react.dev/" },
  { name: "Render", icon: SiRender, color: "text-purple-500", url: "https://render.com/" },
  { name: "Vercel", icon: SiVercel, color: "text-black dark:text-white", url: "https://vercel.com/" },
  { name: "C++", icon: SiCplusplus, color: "text-blue-600", url: "https://isocpp.org/" },
  { name: "SQL", icon: Database, color: "text-indigo-600", url: "https://www.w3schools.com/sql/" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            About Me
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            A passionate full-stack developer with 5+ years of experience building scalable web applications. 
            I love turning complex problems into simple, beautiful solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">My Story</h3>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                Started my journey in computer science with a curiosity for how things work. 
                What began as tinkering with HTML and CSS evolved into a deep passion for creating full-scale applications.
              </p>
              <p>
                I specialize in React, Node.js, and modern web technologies, always staying current with industry trends and best practices. 
                My goal is to write clean, maintainable code that solves real-world problems.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, 
                or sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          <div>
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
              alt="Modern developer workspace" 
              className="rounded-2xl shadow-2xl w-full h-auto" 
            />
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Skills & Technologies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 justify-items-center">
            {skills.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <Button
                  key={skill.name}
                  variant="ghost"
                  className="p-4 h-auto flex flex-col items-center space-y-3 hover:scale-110 hover:shadow-lg transition-all duration-300 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary/50"
                  onClick={() => window.open(skill.url, '_blank', 'noopener,noreferrer')}
                >
                  <IconComponent className={`text-5xl ${skill.color} transition-transform duration-300`} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {skill.name}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
