import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiMongodb, 
  SiAmazon, 
  SiDocker, 
  SiGit, 
  SiTypescript 
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, level: 90, color: "text-cyan-500" },
  { name: "Node.js", icon: SiNodedotjs, level: 85, color: "text-green-500" },
  { name: "Python", icon: SiPython, level: 80, color: "text-blue-500" },
  { name: "MongoDB", icon: SiMongodb, level: 75, color: "text-orange-500" },
  { name: "AWS", icon: SiAmazon, level: 70, color: "text-yellow-500" },
  { name: "Docker", icon: SiDocker, level: 78, color: "text-blue-600" },
  { name: "Git", icon: SiGit, level: 95, color: "text-red-500" },
  { name: "TypeScript", icon: SiTypescript, level: 88, color: "text-purple-500" },
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

        
      </div>
    </section>
  );
}
