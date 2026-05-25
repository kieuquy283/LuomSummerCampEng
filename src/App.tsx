import Activities from './components/Activities';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
// import PastSeasonsGallery from './components/PastSeasonsGallery';
import RegistrationOptions from './components/RegistrationOptions';
import RecruitmentDepartments from './components/RecruitmentDepartments';
import VolunteerRegistrationForm from './components/VolunteerRegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      <main>
        <Hero />
        <Activities />
        {/* <PastSeasonsGallery /> */}
        <RecruitmentDepartments />
        <RegistrationOptions />
        <VolunteerRegistrationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
