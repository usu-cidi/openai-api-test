const OPEN_AI_KEY = ''; //Enter your OpenAI API key here (between the single quotes)

const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: OPEN_AI_KEY,
});

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`\nEnter your prompt: `, prompt => {
    console.log("\nLoading...");
    talkToAI(prompt)
        .then(result => {
            console.log(result + "\n");
        });
    readline.close();
});

async function talkToAI(
    prompt,
    temp= 0.5, //Change the temperature here (within the single quotes)
    maxTok= 400, //Change the max number of tokens here (within the single quotes)
    model= 'text-davinci-003' //Change the model here (within the single quotes)
) {
    const completion = await openai.completions.create({
        model: model,
        prompt: prompt,
        temperature: temp,
        max_tokens: maxTok,
    });
    return completion.choices[0].text;
}
