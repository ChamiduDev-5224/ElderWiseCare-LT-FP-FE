import { Navbar } from "../common/Navbar";

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className="bg-gray-50 min-h-screen p-8">
                {/* Header */}
                <header className="text-center mb-12 mt-16">
                    <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
                    <p className="text-lg text-gray-700 mt-2">Our Mission, Vision, and Team</p>
                </header>

                {/* Mission and Vision */}
                <section className="mb-16">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row md:space-x-12">
                            {/* Mission */}
                            <div className="md:w-1/2 mb-8 md:mb-0">
                                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    At ElderWiseCare, we are committed to improving the quality of life for elderly individuals
                                    through compassionate care and innovative solutions. Our mission is to provide a platform that
                                    connects caregivers with those in need of care, ensuring that every elderly person receives the
                                    attention and support they deserve.
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Vision</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    We envision a world where every elderly person has access to high-quality care and support.
                                    Our goal is to create a seamless platform that not only provides exceptional care services but also
                                    fosters a sense of community and connection for both caregivers and caretakers.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Team */}
                <section className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Meet Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Team Member 1 */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                                <img
                                    src="https://elderwisecare.s3.us-west-1.amazonaws.com/pro.png"
                                    alt="Team Member 1"
                                    className="w-32 h-32 mx-auto rounded-full mb-4 border-2 bg-indigo-200"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Chamidu Ravihara</h3>
                                <p className="text-gray-600 text-center">CEO & Founder</p>
                            </div>

                            {/* Team Member 2 */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                                <img
                                    src="https://elderwisecare.s3.us-west-1.amazonaws.com/pro.png"
                                    alt="Team Member 2"
                                    className="w-32 h-32 mx-auto rounded-full bg-cover fix border-2 bg-indigo-200"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Chamidu Ravihara</h3>
                                <p className="text-gray-600 text-center">CTO</p>
                            </div>

                            {/* Team Member 3 */}
                            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                                <img
                                    src="https://elderwisecare.s3.us-west-1.amazonaws.com/pexels-olly-774909.jpg"
                                    alt="Team Member 3"
                                    className="w-32 h-32  mx-auto rounded-full object-cover mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Emily Johnson</h3>
                                <p className="text-gray-600 text-center">COO</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                        <p className="text-lg text-gray-600 mb-4">
                            For more information or inquiries, feel free to reach out to us. We’d love to hear from you!
                        </p>
                        <a
                            href="mailto:info@elderwisecare.com"
                            className="text-lg font-medium text-blue-500 hover:text-blue-700"
                        >
                            info@elderwisecare.com
                        </a>
                    </div>
                </section>
            </div>
        </div>

    );
};

export default AboutUs;
