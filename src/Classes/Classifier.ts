import OpenAI from "openai";

export default class Classifier {
    private openai: OpenAI;

    constructor(apiKey: string = '') {
        this.openai = new OpenAI({ apiKey: apiKey || '' });
    }
    

    public async classify(jobKeywords:string,resume: string) {
        const intent = `You will be provided with a resume, and your task is to classify if the resume is for a ${jobKeywords} or not.`;
        const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": intent
                },
                {
                    "role": "user",
                    "content": resume
                }
            ],
            temperature: 0,
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        return response
    }

}