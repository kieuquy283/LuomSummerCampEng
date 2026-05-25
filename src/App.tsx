import Activities from './components/Activities';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import FitGuide from './components/FitGuide';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import RegistrationOptions from './components/RegistrationOptions';
import RecruitmentDepartments from './components/RecruitmentDepartments';
import Timeline from './components/Timeline';
import VolunteerRegistrationForm from './components/VolunteerRegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      <main>
        <Hero />
        <Activities />
        <RecruitmentDepartments />
        <FitGuide />
        <Timeline />
        <Benefits />
        <Process />
        <RegistrationOptions />
        <VolunteerRegistrationForm />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
