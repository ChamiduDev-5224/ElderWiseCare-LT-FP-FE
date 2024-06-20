import banVideo from '../../assets/banVideo.mp4'
const SectionTwo = () => {
    return (
        <div>
            <section className='bg-light-green'>
                <video autoPlay muted playsInline={true} loop className='px-12 py-6 lg:px-36 lg:py-12'>
                    <source src={banVideo} type="video/mp4" />
                </video>
            </section>
        </div>
    )
}

export default SectionTwo