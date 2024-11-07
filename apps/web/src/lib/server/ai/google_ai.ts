import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "env";

export const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_AI_STUDIO_API_KEY,
});
