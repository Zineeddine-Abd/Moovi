from smolagents import Tool
from ddgs import DDGS 

class DuckDuckGoSearchTool(Tool):
    name = "web_search"
    description = "Performs a web search based on your query (like a Google search) and returns the top search results. Use this to find opinions, reviews, or what movies fit a certain mood."
    inputs = {'query': {'type': 'string', 'description': 'The search query to perform.'}}
    output_type = "string"

    def __init__(self, max_results=5, **kwargs):
        super().__init__()
        self.max_results = max_results
        self.ddgs = DDGS(**kwargs)

    def forward(self, query: str) -> str:
        results = self.ddgs.text(query, max_results=self.max_results)
        if not results:
            return "No results found for that query."
        
        postprocessed_results = [f"[{result['title']}]({result['href']})\n{result['body']}" for result in results]
        return "\n\n".join(postprocessed_results)