import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const downloadResume = () => {
    // Open the backend endpoint in a new tab (which redirects to Google Drive)
    window.open("/api/resume", "_blank");
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="mb-8 animate-fade-in-up">
            <img 
              src="Image1234.jpeg.jpg" 
              alt="Jatin Sharma Profile" 
              className="w-32 h-32 rounded-full mx-auto mb-8 object-cover border-4 border-white dark:border-slate-800 shadow-2xl" 
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up delay-200">
            <span className="block text-slate-900 dark:text-white">Jatin Sharma</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Full Stack Developer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-300">
            Crafting digital experiences with modern technologies. Passionate about clean code, innovative solutions, and bringing ideas to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Button 
              onClick={scrollToProjects}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              View My Work
            </Button>
            <Button 
              variant="outline"
              onClick={downloadResume}
              className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-semibold transform hover:scale-105 transition-all duration-200"
            >
              Download Resume
            </Button>
          </div>
          
          <div className="mt-12 animate-bounce-slow">
            <ChevronDown className="mx-auto text-2xl text-slate-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
