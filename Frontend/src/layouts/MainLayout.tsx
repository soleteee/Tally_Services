import { type FC, type ReactNode, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';


interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/landing-page';

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, [location.pathname]);

    if (isLandingPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen relative bg-bg">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
