import Benefits from './components/Benefits';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import InstructorRecruitment from './components/InstructorRecruitment';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <InstructorRecruitment />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
