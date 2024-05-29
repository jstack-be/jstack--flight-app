import OpenAI from "openai";
import environment from "./enviroment";

const openai = new OpenAI({
    organization: environment.openAiOrgKey,
    apiKey: environment.openAiApiKey
});

export default openai;