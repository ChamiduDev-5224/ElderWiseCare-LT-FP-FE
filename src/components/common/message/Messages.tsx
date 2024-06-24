type Props = {
    msg: string,
}


export const DangerMsg = (props: Props) => {
    return (
        <div>
            <span className="text-red-600">{props.msg}</span>
        </div>
    )
}

export const WarningMsg = (props: Props) => {
    return (
        <div>
            <span className="text-yellow-600">{props.msg}</span>
        </div>
    )
}
export const SuccessMsg = (props: Props) => {
    return (
        <div>
            <span className="text-green-700">{props.msg}</span>
        </div>
    )
}
export const InfoMsg = (props: Props) => {
    return (
        <div>
            <span className="text-blue-600">{props.msg}</span>
        </div>
    )
}