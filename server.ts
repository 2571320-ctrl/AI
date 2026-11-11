import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Server-side Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/gemini/comment', async (req, res) => {
  try {
    const { typeId, typeName, scores, userName } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const nameLabel = userName ? `${userName} 님` : '예비 강사님';
    const scoreSummary = scores ? JSON.stringify(scores) : '{}';

    const prompt = `
수강생 이름/호칭: ${nameLabel}
결과 유형: [${typeId}] ${typeName}
7개 소양 점수: ${scoreSummary}

위 결과를 바탕으로, 다음 3가지 내용을 정확히 3문장 이내(1문장씩 총 3문장)의 완성된 짧은 코멘트로 작성해 주세요:
1) ${nameLabel}의 두드러진 강점 칭찬 (1문장)
2) 천안 소상공인(예: 두정동 대학가 카페, 신부동 먹자골목, 천안 중앙시장 등) 강의 현장에서 이 강점이 빛날 구체적 장면 (1문장)
3) 이번 주에 바로 해 볼 수 있는 작은 실천 한 가지 (1문장)

규칙:
- 3문장 이내로만 답하세요. 불렛 포인트나 번호 매김 없이 연속된 줄글로 작성하세요.
- 과장되거나 상투적인 수식어(예: "놀라운 미래", "빛나는 잠재력")는 절대 쓰지 말고, 현장감 있고 담백하게 작성하세요.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          '너는 천안에서 소상공인 대상 AI 교육을 해 온 현장 강사다. 따뜻하고 담백한 존댓말로, 과장과 상투적인 표현 없이, 구체적인 가게 장면을 들어 3문장 이내로 쓴다.',
      },
    });

    const comment = response.text?.trim() || '';
    return res.json({ comment });
  } catch (error: any) {
    console.error('Error generating AI comment:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate AI comment',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
