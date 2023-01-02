import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');  
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
  
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value)
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ricky.ai</h1>
          </div>
          <div className="header-subtitle">
            <h2>I'm an artifical intelligence chatbot cloned from Ricky's knowledge and experience. In fact, I am more friendlier than Ricky and will answer your question without frustration &#128515;. I am knowledgeable about business, economics, finance, investing, education, and decision making. Even though I can give you useful information, you should also talk to other experts before making any decisions. Please keep in mind that I will not answer personal questions. Feel free to ask me any other questions you may have.</h2>
          </div>
        </div>
      {/* Add this code here*/}
      <div className="prompt-container">
        <textarea 
          placeholder="enter your questions here"
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText} 
        />
      </div>  
        {/* New code I added here */}
      <div className="prompt-buttons">
          <a style={{margin: '0 auto'}} className="generate-button" onClick={callGenerateEndpoint}>
            <div className="generate">
            {isGenerating ? <span className="loader"></span> : <p>Ask</p>}
            </div>
           </a>
        </div>
        {apiOutput && (
          <div className="output">  
            <div className="output-header-container">
              <div className="output-header">
                <h3>Answer</h3>
              </div>
            </div>
           <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}  
          </div>
    </div>
  );
};


export default Home;
