import os;
import yaml
import json;
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from smolagents import CodeAgent
from smolagents import OpenAIServerModel
from Tools.final_answer import FinalAnswerTool
from Tools.movie_tools import search_media_by_title, get_media_details_by_id
from Tools.web_search import DuckDuckGoSearchTool
from Tools.trailer_finder_tool import find_youtube_trailer
from fastapi.middleware.cors import CORSMiddleware

# Load API keys from .env file
load_dotenv()

# 1. Initialize the Model
# 1. Read the Gemini API Key from the environment
gemini_api_key = os.getenv("GEMINI_API_KEY")

# 2. Initialize the GoogleGenerativeAIModel
model = OpenAIServerModel(
    model_id="gemini-2.0-flash",
    api_base="https://generativelanguage.googleapis.com/v1beta/openai/",
    api_key=gemini_api_key,
    max_tokens=8192,
    temperature=0.5,
)

# 2. Load Prompt Templates
with open("prompts.yaml", 'r') as stream:
    prompt_templates = yaml.safe_load(stream)

# 3. Create the Agent
moovi_agent = CodeAgent(
    model=model,
    tools=[
        FinalAnswerTool(), 
        search_media_by_title, 
        get_media_details_by_id, 
        DuckDuckGoSearchTool(),
        find_youtube_trailer,
    ],
    prompt_templates=prompt_templates,
    max_steps=8, 
    additional_authorized_imports=["json"]
)

# 4. Create the FastAPI App
app = FastAPI()

origins = os.getenv("ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRequest(BaseModel):
    query: str

@app.post("/agent")
async def run_agent(request: UserRequest):
    final_response_object = moovi_agent.run(request.query)
    final_response_string = json.dumps(final_response_object)
    print('yes' + final_response_string)

    return {"response": final_response_string}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)