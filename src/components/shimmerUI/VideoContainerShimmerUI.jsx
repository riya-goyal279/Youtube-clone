const VideoContainerShimmerUI = () => {
    return (
        <div className='px-6 py-4'>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8'>
                { 
                    Array(12).fill(0).map((item, index) => (
                        <div key={index} className='cursor-pointer flex flex-col items-center'>
                            <div className='bg-black/10 w-full aspect-16/9 rounded-xl'></div>
                            <div className='flex mt-3 w-full'>
                                <div className="h-9 w-9 rounded-full mr-3 shrink-0 bg-black/10"></div>
                                <div className='flex-1'>
                                    <div className="h-11 bg-black/10 w-full mr-6"></div>
                                    <div className="h-4 bg-black/10 w-1/3 mt-1"></div>
                                    <div className="h-4 bg-black/10 w-3/4 mt-1"></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoContainerShimmerUI
