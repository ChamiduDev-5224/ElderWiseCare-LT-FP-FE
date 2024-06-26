import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div>    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-green">
            <h1 className="text-4xl font-bold text-gray-200 mb-4">404 - Page Not Found</h1>
            <p className="text-white mb-6">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="text-green-50 hover:text-blue-400 border-2 rounded-lg px-20 py-4">Go to Home</Link>
        </div>
        </div>
    )
}


export default NotFound