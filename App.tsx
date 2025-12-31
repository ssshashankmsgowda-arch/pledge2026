
import React, { useState, useMemo } from 'react';
import { Step, Pledge, UserData } from './types';
import Header from './components/Header';
import Hero from './components/Hero';

import UserForm from './components/UserForm';
import CertificatePreview from './components/CertificatePreview';
import Success from './components/Success';
import Poster from './components/Poster';

import MissionSection from './components/MissionSection';
import SocialSection from './components/SocialSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [inFlow, setInFlow] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(Step.Form);
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    photo: ''
  });

  const startFlow = () => {
    setInFlow(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(Step.Form);
  };

  const exitFlow = () => {
    setInFlow(false);
    setCurrentStep(Step.Form);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep === Step.Form) {
      exitFlow();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const customPledgeObject: Pledge = useMemo(() => ({
    id: 999,
    text: userData.customPledge || '',
    explanation: 'My 2025 Commitment'
  }), [userData.customPledge]);

  const renderPledgeStep = () => {
    switch (currentStep) {
      case Step.Form:
        return (
          <UserForm
            userData={userData}
            setUserData={setUserData}
            onBack={exitFlow}
            onContinue={() => {
              setCurrentStep(Step.Preview);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case Step.Preview:
        return (
          <CertificatePreview
            pledge={customPledgeObject}
            userData={userData}
            setUserData={setUserData}
            onBack={() => setCurrentStep(Step.Form)}
            onConfirm={() => {
              setCurrentStep(Step.Success);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case Step.Success:
        return <Success onReset={exitFlow} userData={userData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] selection:bg-red-100 selection:text-red-900">
      <Header onCtaClick={() => startFlow()} isPledging={inFlow} onExit={exitFlow} />

      {/* Hidden container for rendering the poster to canvas - ALWAYS RENDERED */}
      <div style={{ position: 'fixed', top: '-5000px', left: '-5000px' }}>
        {(userData.customPledge || userData.fullName) && (
          <div id="pledge-poster-capture" style={{ width: '1080px', height: '1440px', overflow: 'hidden' }}>
            <Poster pledge={customPledgeObject} userData={userData} />
          </div>
        )}
      </div>

      {!inFlow ? (
        <div className="animate-fade-in">
          <Hero onStart={() => startFlow()} />
          <MissionSection />
          <SocialSection />
          <Footer />
        </div>
      ) : (
        <div className="pt-24 min-h-screen bg-[#fcfcfb] flex items-start justify-center">
          <div className="w-full animate-fade-in relative">
            <div className="min-h-[80vh] flex flex-col">
              {renderPledgeStep()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;