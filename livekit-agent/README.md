# LiveKit Voice Agent

Python backend agent for the voice demo on the `/demo` page. **Deploys separately from the Next.js frontend.**

## Agent vs frontend

| Component | Deploys to | Role |
|-----------|------------|------|
| **Frontend (Next.js)** | Vercel | Serves the site, issues LiveKit tokens, dispatches this agent into rooms |
| **This agent (Python)** | Railway, Render, Fly.io, etc. | Long-running process; connects to LiveKit and handles voice (STT, LLM, TTS) |

Both must be deployed for the voice demo to work. See [VERCEL_DEPLOYMENT_GUIDE.md](../VERCEL_DEPLOYMENT_GUIDE.md) for the frontend.

---

## Local setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env.local` in this directory:
```env
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_api_key
```

3. Run locally:
```bash
python agent.py dev
```

---

## Deploy the agent

The agent runs as a long-running Python process. Use one of the options below.

### Option A: Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**.
2. Select your repo, set **Root Directory** to `livekit-agent`.
3. Add environment variables: `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `OPENAI_API_KEY`.
4. Set **Start Command**: `python agent.py start`.
5. Deploy. Railway will keep the agent running.

### Option B: Render

1. Go to [render.com](https://render.com) → **New** → **Web Service**.
2. Connect your repo, set **Root Directory** to `livekit-agent`.
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `python agent.py start`
5. Add environment variables: `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `OPENAI_API_KEY`.
6. Deploy. Use a paid plan if the free tier sleeps (agent must stay running).

### Option C: Fly.io

1. In `livekit-agent/`, create `Dockerfile`:
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "agent.py", "start"]
```

2. Deploy (agent runs as a worker; no HTTP port needed):
```bash
cd livekit-agent
fly auth login
fly launch
fly secrets set LIVEKIT_URL=wss://... LIVEKIT_API_KEY=... LIVEKIT_API_SECRET=... OPENAI_API_KEY=...
fly deploy
```

3. When prompted, choose **No** for HTTP services if asked (the agent is a long-running worker).

---

## Configuration

- The agent name is set to "Casey-615" in the code
- The room name used by the frontend is "voice-demo"
- The agent uses OpenAI GPT-4.1-mini for LLM
- Uses Cartesia Sonic-3 for TTS
- Uses AssemblyAI Universal Streaming for STT

