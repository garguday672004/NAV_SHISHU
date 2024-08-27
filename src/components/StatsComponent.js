 
const Stats = [
    {count: '3000', label: 'Number of fertility clinics'},
    {count: '2K', label: 'Number of babies born'},
    {count: '25000+', label: 'Parents who prefer Surrogacy'},
    {count: '1000+', label: 'Surrogate mothers'},
];

function StatsComponent() {
  return (
    <section className="bg-indigo-600">
        <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto ">
            <div className="flex justify-evenly">
                {Stats.map((data, index) => {
                    return (
                        <div key={index} className="flex flex-col py-10">
                            <h1 className="text-[30px] font-bold text-richblack-5">{data.count}</h1>
                            <h2 className="font-semibold text-[16px] text-richblack-500">{data.label}</h2>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    </section>
  );
}

export default StatsComponent;