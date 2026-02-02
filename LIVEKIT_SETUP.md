# LiveKit Setup Guide

This guide explains how to set up LiveKit for the voice agent demo.

## Prerequisites

1. A LiveKit Cloud account (or self-hosted LiveKit server)
2. OpenAI API key (for the LLM)
3. Python 3.8+ (for running the agent)

## Step 1: Get LiveKit Credentials

1. Sign up at [LiveKit Cloud](https://cloud.livekit.io/) or set up your own LiveKit server
2. Create a new project
3. Get your credentials:
   - **LiveKit URL** (WebSocket URL, e.g., `wss://your-project.livekit.cloud`)
   - **API Key**
   - **API Secret**

## Step 2: Configure Environment Variables

### Frontend (.env.local in project root)

Add these variables to your `.env.local` file:

```env
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
```

### Backend Agent (.env.local in livekit-agent directory)

Create a `.env.local` file in the `livekit-agent` directory:

```env
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_api_key
```

**Important:** The Python agent requires `LIVEKIT_URL` (not `NEXT_PUBLIC_LIVEKIT_URL`). The `NEXT_PUBLIC_` prefix is only for Next.js frontend variables.

## Step 3: Set Up the Python Agent

1. Navigate to the `livekit-agent` directory:
```bash
cd livekit-agent
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the agent:
```bash
python agent.py dev
```

The agent will connect to your LiveKit server and wait for connections.

## Step 4: Test the Demo

1. Start your Next.js development server:
```bash
npm run dev
```

2. Navigate to `/demo` page
3. Click "Try Now" on the Voice Bot card
4. Click "Start Call" on the voice demo page
5. Allow microphone access when prompted
6. The agent should connect and you can start talking!

## Troubleshooting

### "Failed to connect" error
- Verify your `NEXT_PUBLIC_LIVEKIT_URL` is correct
- Check that `LIVEKIT_API_KEY` and `LIVEKIT_API_SECRET` are set correctly
- Ensure the Python agent is running and connected to the same LiveKit server

### "Microphone access denied"
- Check your browser's microphone permissions
- Make sure you're using HTTPS (required for microphone access in most browsers)

### Agent not responding
- Verify the Python agent is running
- Check that the agent name "Casey-615" matches in both frontend and backend
- Ensure OpenAI API key is set correctly in the agent's `.env.local`

## Production Deployment

### Frontend (Vercel)
Add the environment variables in Vercel dashboard:
- `NEXT_PUBLIC_LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`

### Backend Agent
Deploy the Python agent to a hosting service:
- **Railway**: Connect your GitHub repo and set environment variables
- **Render**: Create a Web Service and set environment variables
- **Fly.io**: Use `fly deploy` with environment variables set

Make sure the agent stays running 24/7 to handle incoming calls.

