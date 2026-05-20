import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Curriculum from './components/Curriculum';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import InstructorRecruitment from './components/InstructorRecruitment';
import Process from './components/Process';
import ProgramInfo from './components/ProgramInfo';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      <main>
        <Hero />
        <ProgramInfo />
        <Benefits />
        <InstructorRecruitment />
        <Curriculum />
        <Process />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
