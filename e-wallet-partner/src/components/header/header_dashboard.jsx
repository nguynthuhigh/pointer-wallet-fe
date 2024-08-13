
export default function HeaderDashboard({...props}){
    return(
        <div className='space-y-2 my-4'>
            <h1 className='font-semi-4xl'>{props.title}</h1>
            <h1 className=''>{props.description}</h1>
        </div>
    )
}