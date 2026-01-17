import { useState, useEffect } from "react";
import { X } from "lucide-react";

const PosterPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        // Check session storage to see if we've already shown it this session?
        // User requirement: "on starting the site". Usually means session-based or just every refresh.
        // "if its off then the poster will not be shown only the site will be started directly if on then the poster will be shown"
        // I'll assume every time the site is loaded (e.g. refresh), based on the prompt "on starting the site".

        fetch("http://localhost:5000/api/poster")
            .then((res) => res.json())
            .then((data) => {
                if (data.isVisible && data.imageUrl) {
                    setIsVisible(true);
                    setImageUrl(data.imageUrl);
                }
            })
            .catch((err) => console.error("Error fetching poster:", err));
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-fade-in-up">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-gray-800 transition-colors z-10"
                >
                    <X size={24} />
                </button>
                <div className="w-full h-auto">
                    <img
                        src={imageUrl}
                        alt="Welcome Poster"
                        className="w-full h-auto object-cover"
                        style={{ aspectRatio: "1 / 1.414" }} // A4 Ratio
                    />
                </div>
            </div>
        </div>
    );
};

export default PosterPopup;
