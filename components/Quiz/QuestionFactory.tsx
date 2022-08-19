import { QuestionType } from "../../types/typesForUs"
import QuizEdit from "./QuizEdit"

export default function QuestionFactory({ Items }: { Items: QuestionType[] }) {
    
    console.log("Question Factory");
    console.log(Items);
    return (
        <>
            {Items.map((item) => {
                return(
                    <QuizEdit key={item.id} item={item} questionId={item.id}/>
                )
                // <p>{</p>
            })}
        </>
    )
}
