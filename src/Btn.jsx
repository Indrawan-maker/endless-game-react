export default function Btn(props) {
    return (

    <div className="btn-wrapper">
    <button className={props.className}>{props.value}</button>
    </div>

    )
}