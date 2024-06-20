
import banner1 from '../../assets/banner1.svg'
export const SectionOne = () => {
    return (
        <div className="bg-dark-green h-fit pt-12">
            <h1 className='text-white flex-row font-semibold text-4xl ml-12 pt-12'>"Empowering Elders, Simplifying Care"</h1>
            <div className='flex flex-col lg:flex-row justify-evenly'>
                <div className='intro px-8 w-[100%] lg:ml-12 lg:w-[50%]'>
                    <p className='text-light-green pt-10 overflow-visible w-[100%] text-lg'>At ElderWiseCare, we understand the importance of finding reliable and compassionate caregivers for your loved ones. Our intuitive platform connects you with certified and experienced caregivers who are dedicated to providing exceptional elder care. Whether you need daily assistance, specialized medical support, or companionship, our advanced matching system ensures you find the perfect caregiver to meet your needs. Join our community and experience peace of mind, knowing that quality care is just a few clicks away.</p>
                    <button className='bg-mid-green px-2 py-2 mt-10 rounds'>Learn More</button>
                </div>
                <div className='flex h-[520px]'>
                    <img src={banner1} alt="banner" style={{
                        alignItems: "flex-end", filter: ' grayscale(85%)',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                        objectFit: "cover",
                    }} />
                </div>
            </div>
        </div>
    )
}
