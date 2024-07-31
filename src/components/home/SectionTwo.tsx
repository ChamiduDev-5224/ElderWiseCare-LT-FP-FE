import banVideo from '../../assets/cideo.mp4'
const SectionTwo = () => {
    return (
        <div>
            <section className='bg-light-green'>
                <video autoPlay muted playsInline={true} loop className='px-12 py-6 lg:px-48 lg:py-12 rounded-lg'>
                    <source src={banVideo} type="video/mp4" />
                </video>
            </section>
        </div>
    )
}

export default SectionTwo