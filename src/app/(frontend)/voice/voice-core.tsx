"use client"

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime'

import SYSTEM from './SYSTEM'
import OrbVisualizer from './orb-visualizer'
import { internetSearchTool } from './tools/internet-search'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function RealtimeVoice() {
    const agentRef = useRef<RealtimeAgent | null>(null)
    const sessionRef = useRef<RealtimeSession | null>(null)

    const [status, setStatus] = useState<string>('Disconnected')
    const [isSessionActive, setIsSessionActive] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [intensity, setIntensity] = useState(3)
    const [currentVolume, setCurrentVolume] = useState(0)

    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const mediaStreamRef = useRef<MediaStream | null>(null)
    const volumeDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
    const volumeRafRef = useRef<number | null>(null)

    const stopAudioCapture = useCallback(() => {
        if (volumeRafRef.current !== null) {
            cancelAnimationFrame(volumeRafRef.current)
            volumeRafRef.current = null
        }

        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop())
            mediaStreamRef.current = null
        }

        if (audioContextRef.current) {
            audioContextRef.current.close().catch(() => null)
            audioContextRef.current = null
        }

        analyserRef.current = null
        volumeDataRef.current = null
        setCurrentVolume(0)
    }, [])

    const startAudioCapture = useCallback(async () => {
        if (mediaStreamRef.current) return

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaStreamRef.current = stream

            const AudioContextCtor =
                typeof window !== 'undefined'
                    ? window.AudioContext ||
                    (window as unknown as {
                        webkitAudioContext?: typeof AudioContext
                    }).webkitAudioContext
                    : undefined

            if (!AudioContextCtor) {
                throw new Error('AudioContext is not supported in this browser.')
            }

            const audioContext = new AudioContextCtor()
            await audioContext.resume()

            audioContextRef.current = audioContext

            const source = audioContext.createMediaStreamSource(stream)
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 256
            source.connect(analyser)

            analyserRef.current = analyser
            volumeDataRef.current = new Uint8Array(
                analyser.frequencyBinCount,
            ) as Uint8Array<ArrayBuffer>

            const computeVolume = () => {
                const analyserNode = analyserRef.current
                const dataArray = volumeDataRef.current

                if (!analyserNode || !dataArray) {
                    return
                }

                analyserNode.getByteTimeDomainData(dataArray)

                let sumSquares = 0
                for (let i = 0; i < dataArray.length; i += 1) {
                    const value = (dataArray[i] - 128) / 128
                    sumSquares += value * value
                }

                const rms = Math.sqrt(sumSquares / dataArray.length)
                setCurrentVolume(rms)

                volumeRafRef.current = requestAnimationFrame(computeVolume)
            }

            computeVolume()
        } catch (error) {
            console.error('Error accessing microphone for volume analysis', error)
            setStatus('Microphone access error')
            stopAudioCapture()
            throw error
        }
    }, [stopAudioCapture])

    const stopSession = useCallback(() => {
        if (sessionRef.current) {
            try {
                sessionRef.current.close()
            } catch (error) {
                console.error('Failed to close realtime session', error)
            }
            sessionRef.current = null
        }

        stopAudioCapture()
        setIsSessionActive(false)
        setStatus('Disconnected')
        console.log('Disconnected from session')
    }, [stopAudioCapture])

    const connectToSession = useCallback(async () => {
        if (isSessionActive || isConnecting) {
            return
        }

        setIsConnecting(true)
        setStatus('Connecting...')

        try {
            if (!agentRef.current) {
                agentRef.current = new RealtimeAgent({
                    name: 'Assistant',
                    instructions: SYSTEM,
                    tools: [internetSearchTool],
                })
            }

            sessionRef.current = new RealtimeSession(agentRef.current, {
                model: 'gpt-realtime',
            })

            const response = await fetch('/api/realtime', { method: 'POST' })
            if (!response.ok) {
                throw new Error(`Realtime session request failed: ${response.statusText}`)
            }

            const data = await response.json()
            const apiKey: string | undefined =
                data?.value ?? data?.apiKey ?? data?.key ?? data?.sessionKey

            if (!apiKey) {
                throw new Error('Realtime API key not found in response.')
            }

            await sessionRef.current.connect({
                apiKey,
            })

            await startAudioCapture()

            setIsSessionActive(true)
            setStatus('Connected')
            console.log('Connected to session')
        } catch (error) {
            console.error('Failed to connect to realtime session', error)
            setStatus('Connection failed')
            stopAudioCapture()
            if (sessionRef.current) {
                try {
                    sessionRef.current.close()
                } catch {
                    // ignore
                }
                sessionRef.current = null
            }
        } finally {
            setIsConnecting(false)
        }
    }, [isConnecting, isSessionActive, startAudioCapture, stopAudioCapture])

    const handleToggleSession = useCallback(() => {
        if (isSessionActive) {
            stopSession()
        } else {
            void connectToSession()
        }
    }, [connectToSession, isSessionActive, stopSession])

    useEffect(
        () => () => {
            stopSession()
        },
        [stopSession],
    )

    const handleIntensityChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setIntensity(Number(event.target.value))
        },
        [],
    )

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-xs sm:max-w-sm">
                <OrbVisualizer
                    volume={currentVolume}
                    isActive={isSessionActive}
                    intensity={intensity}
                    onClick={handleToggleSession}
                    className="hover:cursor-pointer"
                />
            </div>
            <p className="text-sm text-muted-foreground text-center">
                {isSessionActive
                    ? 'Click orb or stop to pause the conversation.'
                    : 'Click the orb to start the conversation.'}
            </p>
            <div className="w-full max-w-md space-y-3">
                <Label htmlFor="intensity-slider">
                    Animation Intensity: {intensity.toFixed(1)}
                </Label>
                <input
                    id="intensity-slider"
                    type="range"
                    min={0.5}
                    max={12}
                    step={0.5}
                    value={intensity}
                    onChange={handleIntensityChange}
                    className="w-full"
                />
            </div>
            <div className="flex flex-col items-center gap-2">
                <Button
                    onClick={handleToggleSession}
                    disabled={isConnecting}
                    variant={isSessionActive ? 'destructive' : 'default'}
                >
                    {isSessionActive ? 'Stop Session' : 'Start Session'}
                </Button>
                <span className="text-sm text-muted-foreground">{status}</span>
            </div>
        </div>
    )
}