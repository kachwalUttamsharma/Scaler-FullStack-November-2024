import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCXFv82iImIv_i0MvPSAhM9A6BdBiKnAEI");

export const getGeminiModel = async () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
};

export const getMovieRecommendations = async (watchList) => {
  try {
    const model = await getGeminiModel();
    const prompt = `Based on these movies in the user's watchlist: 
    ${watchList.map((movie) => `- ${movie.title}`)}
    
    Please recommend 5 similar movies. For each movie, provide:
    - Title
    - Brief reason why it's recommended
    - Confidence score (0-100)
    
    Return the response in this JSON format:
    {
      "recommendations": [
        {
          "title": "Movie Title",
          "reason": "Reason for recommendation",
          "confidence": 85
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    return JSON.parse(
      result.response
        .text()
        .replace(/```json|```/g, "")
        .trim()
    );
  } catch (error) {
    console.log("error in getMovieRecommendations : ", error);
  }
};
