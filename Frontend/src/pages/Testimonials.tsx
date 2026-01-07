import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

interface Testimonial {
    id: number;
    content: string;
    name: string;
    designation: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        content: "आपकी सर्विस व सक्रियता के हम दिल से प्रशंसक है हमने जब भी कोई प्रोब्लम या परेशानी को आपसे शेयर किया आपने पलक झपकते ही हमे हमारी समस्या का समाधान दे दिया । ओर जगह भी पहले हम involve थे । वहा पर हमे उतना रेस्पांस नही मिला ।हम आपके दिल से आभारी है हमने देर रात भी आपको डिस्टर्ब किया आपने कभी यह नही कहा सुबह या कल होगा । आपसे हमे जो सर्विस मिलता है हम उसको लोगो से कहते भी है आप पवन मित्तल सर से बात करे आपको कोई परेशानी नही होगी हम आपको गारंटी करते है ।",
        name: "Anil Chetan",
        designation: "Accountant, 31 Dashmesh Nagar, Meerut"
    },
    {
        id: 2,
        content: "पहले में अपनी एकाउंटिंग करवाया करता था फिर मेरी मुलाकात मित्तल ऑनलाइन सर्विसेज में हुई वहां पर उन्होंने मुझे बहुत ज्यादा मुझे समझाया कि भाई टेली ले लो इससे व्यापार करना बहुत आसान हो जाएगा मैंने मना करा कि मेरे लिए टैली सॉफ्टवेयर चलाना असंभव है उन्होंने मुझे समझाया आप हमारे कहने से एक बार टैली पर कार्य कर कर करके देखो आपको लगेगा कि मैंने यह बहुत पहले ही लेनी थी पर कोई बात नहीं आप हमारे कहने से यह अपने कंप्यूटर में टैली का सॉफ्टवेयर डलवा लो फिर कार्य करते हो कोई दिक्कत आएगी तो हम आपको100 बार भी समझाइए हमने उनके कहने से यह सॉफ्टवेयर लिया उस दिन से मेरा व्यापार100 गुना बढ़ गया क्योंकि मैं अब किसी अकाउंटेंट के निर्भर नहीं रहा",
        name: "Pankaj Mittal",
        designation: "Prop of Aashirwad Organosys, Meerut"
    },
    {
        id: 3,
        content: "With tally accounting prowess, you can accurately plan purchases, manage working capital and improve cash flow for our organization. It allows you to keep check on expenditures, handle exceptions in business processes and manage your financials in better fashion. First class training from tally authorized partner \"Mittal Online Services\" added value to our experiences and tally services.",
        name: "Tarun Manrai",
        designation: "IT Manager, Sharda Exports, Meerut"
    },
    {
        id: 4,
        content: "Before meeting u we were thinking of using some other software but now we fully satisfied with your excellent service. moreover u update us also about the new features of this software which r of great utility to us and last but not the least you do things very meticulously and your services r up to the mark",
        name: "Deepak Goel",
        designation: "Maple Logistics, Meerut"
    },
    {
        id: 5,
        content: "In this lockdown period maintaining accounts ,balance sheets ,changing company financial year etc is a difficult job but Mittal online services come as a boon to maintain all these things from home only. They are very helpful and supportive.",
        name: "Gaurav Gera",
        designation: "Adersh Foam, Meerut"
    },
    {
        id: 6,
        content: "It is good to have you as our channel partner of tally. We get the timely information about the updates coming . The complete knowledge and the command that you have over tally is un appareled. You just know how many number of enter to press before coming to the desired option . This can only be achieved when one has the complete command of the subject. We will continue with your partnership of tally and wish you great success in this field .",
        name: "Palav Garg",
        designation: "Basant Glass, Meerut"
    }
];

const Testimonials: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-5 max-w-[1200px] mx-auto">
            <ScrollReveal animation="fade-up">
                <h1 className="text-4xl font-bold text-primary mb-6 text-center">Customer Speak</h1>
                <p className="text-lg text-center text-text/80 max-w-3xl mx-auto mb-16">
                    Don't just take our word for it. Hear what our clients have to say about their experience with us.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg relative flex flex-col">
                            <span className="absolute top-4 left-6 text-6xl text-gray-200 font-serif">"</span>
                            <p className="text-text/80 italic text-lg mb-6 mt-8 relative z-10 flex-grow">
                                {testimonial.content}
                            </p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div>
                                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                                    <p className="text-sm text-secondary">{testimonial.designation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Testimonials;
