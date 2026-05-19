import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Curriculum from './components/Curriculum';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import InstructorRecruitment from './components/InstructorRecruitment';
import Process from './components/Process';

function App() {
  return (
    <div className="min-h-screen bg-brand-surface font-sans text-slate-900">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <InstructorRecruitment />
        <Curriculum />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
