"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface MediaSectionProps {
    videoSrc?: string
    imageSrc?: string
    imageAlt?: string
    overlayText?: string
    overlaySubtext?: string
}

export default function MediaSection({
    videoSrc,
    imageSrc,
    imageAlt = 'Contact visual',
    overlayText = 'Let\'s Connect',
    overlaySubtext = 'I\'d love to hear from you. Send me a message and I\'ll respond as soon as possible.',
}: MediaSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current && videoSrc) {
            videoRef.current.play().catch(() => {
            })
        }
    }, [videoSrc])

    return (
        <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px] rounded-lg">
            <div className='overflow-hidden filter grayscale brightness-50 w-full h-full'>
                {videoSrc ? (
                    <video
                        ref={videoRef}
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                ) : imageSrc ? (
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
                )}
            </div>

            <div className="absolute inset-0 bg-black/40 flex items-end justify-end p-8">
                <div className="text-right text-white space-y-4 max-w-md">
                    <h2 className="text-3xl lg:text-4xl font-bold">{overlayText}</h2>
                    {overlaySubtext && (
                        <p className="text-lg lg:text-xl text-white/90">{overlaySubtext}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

