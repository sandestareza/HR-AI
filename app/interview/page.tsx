import FormInterview from "@/components/FormInterview";
import React from "react";

function InterviewPage() {
   
    return (
        <main className="flex w-full min-h-screen flex-col p-20 px-4 md:p-24">
            <div className="w-full flex flex-col md:flex-row gap-2 bg-zinc-100 md:p-5 rounded-lg">
                <FormInterview />                
            </div>
        </main>
    );
}

export default InterviewPage;
