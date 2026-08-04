import os
import requests
from dotenv import load_dotenv

load_dotenv()


def generate_answer(context, question):

    api_key = os.getenv("OPENROUTER_API_KEY")

    if not api_key:
        return "OpenRouter API key is missing."

    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8000",
        "X-Title": "RAG Chatbot"
    }

    data = {
        "model": "openai/gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "Answer only using the provided context. If information is unavailable, say it is not mentioned."
            },
            {
                "role": "user",
                "content": f"""
Context:
{context}

Question:
{question}
"""
            }
        ]
    }

    response = requests.post(url, headers=headers, json=data)

    result = response.json()

    if response.status_code != 200:
        return "LLM Error: " + str(result)

    return result["choices"][0]["message"]["content"]