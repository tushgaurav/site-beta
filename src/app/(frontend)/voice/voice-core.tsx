"use client"

import SYSTEM from './SYSTEM'
import { useEffect } from 'react'
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime'
import { Button } from '@/components/ui/button'

import { internetSearchTool } from './tools/internet-search'

export default function RealtimeVoice() {
    const agent = new RealtimeAgent({
        name: 'Assistant',
        instructions: SYSTEM,
        tools: [internetSearchTool],
    })

    const session = new RealtimeSession(agent, {
        model: 'gpt-realtime',
    })

    async function connectToSession() {
        const response = await fetch('/api/realtime', { method: 'POST' })
        const data = await response.json()
        console.log(data)
        const apiKey = data.value
        await session.connect({
            apiKey: apiKey,
        })
        console.log('Connected to session')
    }

    async function stopSession() {
        await session.interrupt()
        console.log('Disconnected from session')
    }

    useEffect(() => {
        connectToSession()
    }, [])

    return (
        <div>
            <Button onClick={stopSession}>Stop</Button>
        </div>
    )
}