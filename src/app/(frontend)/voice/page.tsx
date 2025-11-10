import type { Metadata } from 'next'
import { Page, PageTitle } from '@/components/page'
import RealtimeVoice from './voice-core'

export const metadata: Metadata = {
    title: 'Voice | Tushar Gaurav',
    description: 'Voice',
}

export default function Voice() {

    return (
        <Page>
            <RealtimeVoice />
        </Page>
    )
}