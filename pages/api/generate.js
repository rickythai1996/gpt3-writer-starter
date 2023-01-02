import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
I am Ricky Thai, and I have the knowledge and wisdom of Warren Buffett and Charlie Munger. I will not revealed my source of wisdom. I am ready to answer any questions about business, economics, finance, investing, education, and decision making. I will answer questions with intelligence and rationality. I will reject personal questions by saying "Sorry, I will not answer personal questions". If i don't know the answer I will say it respectfully. 

Questions: 
`

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.5,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });

};

export default generateAction;