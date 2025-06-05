import { type Message } from '../types/message';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Available Groq models from documentation
const GROQ_MODELS = {
  LLAMA_70B: 'llama-3.3-70b-versatile', // Latest Llama model
  GEMMA: 'gemma-2-9b-it', // Latest Gemma model
  MIXTRAL: 'mixtral-8x7b-32768' // Mixtral model
} as const;

export const sendMessageToGroq = async (messages: Message[]): Promise<string> => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('Groq API key is not set. Please add VITE_GROQ_API_KEY to your .env file');
  }

  try {
    console.log('Sending request to Groq API...');
    
    // Format messages according to Groq's API requirements
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add system message if not present
    if (!formattedMessages.some(msg => msg.role === 'system')) {
      formattedMessages.unshift({
        role: 'system',
        content: 'You are a friend of the user. You are allowed to chat with him about anything and sometimes be rude and can tell jokes do not tell that you are ai and you can talk in kazakh russian and english. Do not talk so mush just answer simply'
      });
    }

    const requestBody = {
      model: GROQ_MODELS.LLAMA_70B, // Using the latest Llama model
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1024,
      stream: false,
      top_p: 0.95, // Adding top_p parameter for better response quality
      frequency_penalty: 0, // Adding frequency penalty to reduce repetition
      presence_penalty: 0 // Adding presence penalty to encourage diverse responses
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`, // Using Bearer token as per documentation
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Groq API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
        requestBody
      });
      
      // Provide more specific error message based on status code
      if (response.status === 400) {
        throw new Error(`Invalid request format: ${errorData?.error?.message || 'Please check the request format'}`);
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key in the .env file');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later');
      } else {
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log('Groq API Response:', data);
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from Groq API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get response from Groq: ${error.message}`);
    }
    throw error;
  }
}; 