import { useState } from "react";
import { Navbar } from "../common/Navbar";

const faqs = [
    {
        question: "What is this platform about?",
        answer: "This platform connects caregivers and caretakers. Caregivers can create gigs offering their services, and caretakers can find and hire caregivers based on their location. Additionally, we offer entertainment options and item-buying facilities."
    },
    {
        question: "How can I register as a caregiver?",
        answer: "To register as a caregiver, simply click on the 'Sign Up' button and select 'Caregiver' during registration. Fill in the required details and create your profile. You can then start posting gigs offering your services."
    },
    {
        question: "How can I find a caregiver?",
        answer: "As a caretaker, you can search for caregivers based on your location. Use the search feature to find caregivers near you and view their profiles. You can then contact them directly to hire their services."
    },
    {
        question: "What types of gigs can caregivers post?",
        answer: "Caregivers can post a variety of gigs including personal care, medical assistance, companionship, and other support services. You can specify the type of service, availability, and any other relevant details when creating a gig."
    },
    {
        question: "Can I leave reviews for caregivers?",
        answer: "Yes, after hiring a caregiver, you can leave a review based on your experience. Reviews help other caretakers make informed decisions and provide feedback to caregivers."
    },
    {
        question: "How does the entertainment section work?",
        answer: "Our entertainment section includes a selection of videos and content for relaxation and enjoyment. You can browse through the available videos and watch them directly on the platform."
    },
    {
        question: "How can I buy items through the platform?",
        answer: "The item-buying section allows you to browse and purchase various products. You can add items to your cart and proceed to checkout to complete your purchase."
    },
    
    {
        question: "How can I contact customer support?",
        answer: "You can contact our customer support team via email at featuremelove@gmail.com or by calling our support hotline at +94 768567945."
    }
];
const FAQPag = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-6 pt-24 pb-16">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h1>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg">
                            <button
                                onClick={() => handleToggle(index)}
                                className="w-full text-left px-6 py-4 flex justify-between items-center border-b border-gray-200 hover:bg-gray-100 focus:outline-none"
                            >
                                <span className="text-lg font-medium text-gray-700">{faq.question}</span>
                                <svg
                                    className={`w-6 h-6 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                            >
                                <div className="p-6 text-gray-600 font-mono">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default FAQPag