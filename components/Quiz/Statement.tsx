import Emitter from "../../utils/emiiter"

type Statement = {
    text: string
}

export default function Statement({ text }: Statement) {

    return (
        <>
            <div className="px-3" onClick={() => Emitter.emit('QUESTION_STATEMENT_CLICK', "")}>
                {text}
            </div>
        </>
    )
}

