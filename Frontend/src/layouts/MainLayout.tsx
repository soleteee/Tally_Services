import { type FC, type ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
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
