const FilterChipsShimmerUI = () => {
    return (
        <div className="py-3 px-6 md:mx-6 md:px-0 flex items-center relative gap-5 overflow-auto scroll-w-0">
            {
                Array(15).fill(0).map((item, index) => {
                    return <div key={index} className="bg-black/5 rounded-lg h-8 w-28 shrink-0"></div>
                })
            }
        </div>
    )
}

export default FilterChipsShimmerUI
