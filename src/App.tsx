import Activities from './components/Activities';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import PastSeasonsGallery from './components/PastSeasonsGallery';
import ProgramOverview from './components/ProgramOverview';
import RegistrationOptions from './components/RegistrationOptions';
import RecruitmentDepartments from './components/RecruitmentDepartments';
import VolunteerRegistrationForm from './components/VolunteerRegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      <main>
        <Hero />
        <ProgramOverview />
        <Activities />
        <RecruitmentDepartments />
        <PastSeasonsGallery />
        <Benefits />
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
