import { QuestionType } from "../../types/typesForUs"
import QuizEdit from "./QuizEdit"

export default function QuestionFactory({ Items }: { Items: QuestionType[] }) {
    
    return (
        <>
            {Items.map((item) => {
                return(
                    <QuizEdit key={item.id} item={item}/>
                )
                // <p>{</p>
            })}
        </>
    )
}
