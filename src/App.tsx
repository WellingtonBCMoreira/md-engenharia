import { Header } from "./assets/components/Header/Header";
import { Hero } from "./assets/components/Hero/Hero";
import { About } from "./assets/components/About/About";
import { Specialties } from "./assets/components/Specialties/Specialties";
import { Projects } from "./assets/components/Projects/Projects";
import { Contact } from "./assets/components/Contact/Contact";
import { Footer } from "./assets/components/Footer/Footer";
import { SolarCalculator } from "./assets/components/SolarCalculator/SolarCalculator";
import { getHero, getAbout, getSpecialties, getProjects, getContact, getFooter } from "./services/api";
import { useEffect, useState } from "react";

interface HeroData {
  imageUrl?: string;
  title: string;
  description: string;
}
interface AboutData {
  imageUrl: string;
  title: string;
  highlight: string;
  paragraphs: string[];
  social: {
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface SpecialtiesData {
  title: string;
  items: {
    id: string;
    icon: string;
    title: string;
    description: string;
  }[];
}

interface ProjectsData {
  title: string;
  items: {
    title: string;
    imageUrl: string;
    description: string;
  }[];
}

interface ContactData {
  whatsapp: string;
}

interface FooterData {
  logoUrl?: string;
}

function App() {
  const [heroData, setHeroData] = useState<HeroData>({ imageUrl: "", title: "", description: "" });
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [specialtiesData, setSpecialtiesData] = useState<SpecialtiesData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    getHero()
      .then(data => setHeroData(data))
      .catch(error => console.error("Error fetching hero data:", error));
    getAbout()
      .then(data => setAboutData(data))
      .catch(error => console.error("Error fetching about data:", error));
    getSpecialties()
      .then(data => setSpecialtiesData(data))
      .catch(error => console.error("Error fetching specialties data:", error));
    getProjects()
      .then(data => setProjectsData(data))
      .catch(error => console.error("Error fetching projects data:", error));
    getContact()
      .then(data => setContactData(data))
      .catch(error => console.error("Error fetching contact data:", error));
    getFooter()
      .then(data => setFooterData(data))
      .catch(error => console.error("Error fetching footer data:", error));
  }, []);

  return (
    <>
      <Header logoUrl={footerData?.logoUrl} />
      {heroData && (
        <Hero
          imageUrl={heroData.imageUrl}
          title={heroData.title}
          description={heroData.description}
        />
      )}
      {aboutData && (
        <About
          imageUrl={aboutData.imageUrl}
          title={aboutData.title}
          highlight={aboutData.highlight}
          paragraphs={aboutData.paragraphs}
          whatsapp={aboutData.social.whatsapp}
          instagram={aboutData.social.instagram}
          linkedin={aboutData.social.linkedin}
        />
      )}
      {specialtiesData && (
        <Specialties
          title={specialtiesData.title}
          items={specialtiesData.items}
        />
      )}
      {projectsData && (
        <Projects
          title={projectsData.title}
          items={projectsData.items}
        />
      )}
      <SolarCalculator />
      <Contact whatsappNumber={contactData?.whatsapp} />
      <Footer logoUrl={footerData?.logoUrl} />
    </>
  );
}

export default App;
