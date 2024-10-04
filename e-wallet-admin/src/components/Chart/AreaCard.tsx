import { PieChart,Pie,Cell} from 'recharts';
type AreaChartProps = {
    title:string,
    value:number,
    textInfo:string
    color:string
}

export const AreaCard = ({title,value,textInfo,color}:AreaChartProps) => {
    
    const filledValue = value / 100 * 100
    const remainedValue = 360 - filledValue

    const data = [
        { name: 'Fill', value: filledValue },
        { name: 'Remain', value: remainedValue },
      ];
  return (
    <>  
        <div className=" bg-white border-[1px] border-[#0094FF] rounded-[8px] w-fit px-2 py-2 items-center flex flex-1">
            <div>
                <h1 className="font-semibold text-gray-500 text-lg">{title}</h1>
                <div className="font-bold text-[#0094FF] text-3xl">{value}</div>
                <p className='text-md text-green-600 font-semibold'>{textInfo}</p>
            </div>
            <div>
            <PieChart width={100} height={100}>
              <Pie
                data={data}
                cx={50}
                cy={45}
                innerRadius={20}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                startAngle={-270}
                endAngle={150}
                stroke='none'
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? color: '#E0E0E0'} />
                ))}
              </Pie>
            </PieChart>
            </div>
        </div>
    </>
  )
}

