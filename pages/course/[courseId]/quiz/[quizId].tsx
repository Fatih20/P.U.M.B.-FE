import BaseLayout from "@/layout/BaseLayout"
export default function QuizPage() {
    return (

        <BaseLayout showBackButton={true}>
            <div className="mt-3 space-y-3 w-full">
                <div>
                    <h1 className="text-lg">Title of Course</h1>
                    <h1 className="text-3xl">Title of Quiz</h1>
                </div>

                <div>
                    <span>1. Question 1</span>
                    <div className="space-y-3">
                        <a href="#" className="block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            Option 1
                        </a>
                        <a href="#" className="block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            Option 2
                        </a>
                        <a href="#" className="block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            Option 3
                        </a>
                        <a href="#" className="block p-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            Option 4
                        </a>
                    </div>
                </div>

            </div>
        </BaseLayout>

    )
}
