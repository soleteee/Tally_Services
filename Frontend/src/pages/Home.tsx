import React from 'react';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import OurServices from '../components/OurServices';
import ScrollReveal from '../components/ScrollReveal';
import BusinessGrowth from '../components/BusinessGrowth';
import PhotoGallery from '../components/PhotoGallery';

const Home: React.FC = () => {
    return (
        <div className="w-full">
            <Header />
            <ScrollReveal animation="fade-up">
                <AboutUs />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
                <OurServices />
            </ScrollReveal>
            <BusinessGrowth />
            <ScrollReveal animation="fade-up">
                <PhotoGallery />
            </ScrollReveal>
        </div>
    );
};

export default Home;
