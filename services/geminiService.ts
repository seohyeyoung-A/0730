
import { GoogleGenAI, Type } from "@google/genai";
import type { ResultData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const resultSchema = {
    type: Type.OBJECT,
    properties: {
        mbtiType: { type: Type.STRING, description: "분석된 MBTI 유형. 예: INFP" },
        title: { type: Type.STRING, description: "MBTI 유형에 기반한 학습자 유형의 창의적인 이름. 예: '상상력이 풍부한 전략가'" },
        description: { type: Type.STRING, description: "해당 학습 유형에 대한 1~2문장의 간략한 설명." },
        strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "학습자로서 가지는 강점 목록 (3가지)."
        },
        strategies: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "이 학습자에게 추천되는 효과적인 공부 전략 목록 (3가지)."
        },
        challenges: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "이 학습자가 겪을 수 있는 잠재적인 어려움 목록 (2-3가지)."
        }
    },
    required: ["mbtiType", "title", "description", "strengths", "strategies", "challenges"]
};

export const analyzeLearningStyle = async (answers: string[]): Promise<ResultData> => {
    const prompt = `
    다음은 한 학생의 학습 성향 질문에 대한 답변입니다. 각 답변은 MBTI의 네 가지 지표(E/I, S/N, T/F, J/P) 중 하나를 나타냅니다.
    이 답변들을 분석하여 학생의 MBTI 유형을 추론하고, 그에 맞는 학습 유형 프로필을 생성해주세요.
    결과는 반드시 지정된 JSON 스키마 형식으로, 한국어로 작성해야 합니다.

    학생의 답변:
    ${answers.join(', ')}

    분석 지침:
    1. 답변 배열을 기반으로 각 지표(E/I, S/N, T/F, J/P)에서 더 많이 나온 경향을 파악하여 4글자의 MBTI 유형을 결정합니다.
    2. 결정된 MBTI 유형에 맞는 창의적이고 매력적인 학습자 유형 타이틀을 부여합니다.
    3. 해당 유형의 학습 스타일, 강점, 추천 전략, 그리고 잠재적 어려움을 상세하고 긍정적인 톤으로 설명해주세요.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: resultSchema,
            }
        });

        const jsonText = response.text.trim();
        // Sometimes the response might have markdown ```json prefix/suffix
        const cleanJsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
        const result = JSON.parse(cleanJsonText) as ResultData;
        
        return result;

    } catch (error) {
        console.error("Error analyzing learning style:", error);
        if (error instanceof Error) {
            throw new Error(`AI 분석 중 오류가 발생했습니다: ${error.message}`);
        }
        throw new Error("AI 분석 중 알 수 없는 오류가 발생했습니다.");
    }
};
