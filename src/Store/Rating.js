export default function Rating({count,rate}){
    return <>
        <span className="badge bg-primary">{(count/rate).toFixed(2)}%</span>
    </>
}