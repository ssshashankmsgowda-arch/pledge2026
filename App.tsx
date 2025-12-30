import React, { useState, useEffect, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Step, Pledge, UserData } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ImpactSection from './components/ImpactSection';
import PledgeSelection from './components/PledgeSelection';
import UserForm from './components/UserForm';
import CertificatePreview from './components/CertificatePreview';
import Success from './components/Success';
import Poster from './components/Poster';
import SiteFooter from './components/Footer';
import CategoryHero from './components/CategoryHero';
import FeaturedPledges from './components/FeaturedPledges';
import MissionSection from './components/MissionSection';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
  const [inFlow, setInFlow] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(Step.Selection);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPledge, setSelectedPledge] = useState<Pledge | null>(null);
  const [certTheme, setCertTheme] = useState<'minimal' | 'artistic' | 'bold'>('minimal');
  const [images, setImages] = useState<Record<string, string>>({});
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    photo: ''
  });

  useEffect(() => {
    const generateAllImages = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompts = [
          { id: 'main', text: 'Minimalist crystal emerald geometric sprout, macro photography, 8k, ethereal light.' },
          { id: 'environment', text: 'Sustainable green futuristic city architecture, minimalist, soft emerald haze, 8k.' },
          { id: 'health', text: 'Zen balance stones on water, soft green ambient lighting, minimalist, 8k.' },
          { id: 'lifestyle', text: 'Cozy minimalist reading nook, soft morning sunlight, emerald accents, 8k.' },
          { id: 'unity', text: 'Abstract unity concept, minimalist silhouettes, soft emerald backlighting, luxury aesthetic, 8k.' }
        ];
        const generatedImages: Record<string, string> = {};
        await Promise.all(prompts.map(async (p) => {
          try {
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: { parts: [{ text: p.text }] },
              config: { imageConfig: { aspectRatio: "16:9" } }
            });
            for (const part of response.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                generatedImages[p.id] = `data:image/png;base64,${part.inlineData.data}`;
              }
            }
          } catch (e) { console.error(e); }
        }));
        setImages(generatedImages);
      } catch (err) { console.error(err); }
    };
    generateAllImages();
  }, []);

  const heroSlides = useMemo(() => [
    {
      image: images.main || null,
      title1: "Small Steps.",
      title2: "Giant Impact.",
      subtitle: "The most powerful change starts with a single, public commitment for 2025."
    },
    {
      image: images.environment || null,
      title1: "Protect Earth.",
      title2: "Heal Future.",
      subtitle: "Adopt sustainable habits that preserve our planet for generations to come."
    },
    {
      image: images.health || null,
      title1: "Healthy Mind.",
      title2: "Vibrant Life.",
      subtitle: "Commit to wellness and find the balance your body and soul deserve."
    },
    {
      image: images.lifestyle || null,
      title1: "Focus More.",
      title2: "Live Better.",
      subtitle: "Break free from digital noise and reclaim your presence in the real world."
    },
    {
      image: images.unity || null,
      title1: "Better Together.",
      title2: "Join Forces.",
      subtitle: "Be part of a global movement transforming habits into a lasting legacy."
    }
  ], [images]);

  const startFlow = (catId?: string, pledge?: Pledge) => {
    setInFlow(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pledge) {
      setSelectedPledge(pledge);
      setCurrentStep(Step.Form);
    } else if (catId) {
      setSelectedCategory(catId);
      setCurrentStep(Step.Selection);
    } else {
      setSelectedCategory(null);
      setCurrentStep(Step.Selection);
    }
  };

  const exitFlow = () => {
    setInFlow(false);
    setSelectedCategory(null);
    setSelectedPledge(null);
    setCurrentStep(Step.Selection);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const prevStep = () => {
    if (currentStep === Step.Selection && !selectedCategory) {
      exitFlow();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePledgeSelect = (pledge: Pledge) => {
    setSelectedPledge(pledge);
    nextStep();
  };

  const renderPledgeStep = () => {
    switch (currentStep) {
      case Step.Selection:
        return (
          <PledgeSelection
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onPledgeSelect={handlePledgeSelect}
            onResetCategory={() => {
                if (!selectedCategory) exitFlow();
                else setSelectedCategory(null);
            }}
            backgroundImages={images}
          />
        );
      case Step.Form:
        return (
          <UserForm
            userData={userData}
            setUserData={setUserData}
            selectedPledge={selectedPledge}
            onBack={prevStep}
            onContinue={nextStep}
          />
        );
      case Step.Preview:
        return (
          <CertificatePreview
            pledge={selectedPledge!}
            userData={userData}
            setUserData={setUserData}
            theme={certTheme}
            setTheme={setCertTheme}
            onBack={prevStep}
            onConfirm={nextStep}
          />
        );
      case Step.Success:
        return <Success onReset={exitFlow} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] selection:bg-emerald-100 selection:text-emerald-900">
      <Header onCtaClick={() => startFlow()} isPledging={inFlow} onExit={exitFlow} />
      
      {!inFlow ? (
        <div className="animate-fade-in">
          <Hero onStart={() => startFlow()} slides={heroSlides} />
          
          <div className="py-12 bg-white border-b border-stone-50">
            <FeaturedPledges onSelect={(p) => startFlow(undefined, p)} />
          </div>

          <ImpactSection />
          
          <MissionSection />

          <div className="space-y-4 pb-20 bg-stone-50/30">
            <CategoryHero 
              category={CATEGORIES.find(c => c.id === 'environment')!} 
              image={images.environment} 
              onAction={() => startFlow('environment')}
              reversed={false}
            />
            <CategoryHero 
              category={CATEGORIES.find(c => c.id === 'health')!} 
              image={images.health} 
              onAction={() => startFlow('health')}
              reversed={true}
            />
            <CategoryHero 
              category={CATEGORIES.find(c => c.id === 'lifestyle')!} 
              image={images.lifestyle} 
              onAction={() => startFlow('lifestyle')}
              reversed={false}
            />
          </div>
          <SiteFooter />
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

      {/* Hidden container for rendering the poster to canvas */}
      <div className="fixed top-[-5000px] left-[-5000px]" aria-hidden="true">
        {selectedPledge && (
          <div id="capture-container">
            <Poster pledge={selectedPledge} userData={userData} theme={certTheme} id="pledge-poster-capture" />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;