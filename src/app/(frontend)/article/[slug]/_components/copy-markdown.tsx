"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Copy } from "lucide-react"

export default function CopyMarkdown({ markdown }: { markdown: string }) {
    return (
        <Button variant="outline" size="sm" onClick={() => {
            navigator.clipboard.writeText(markdown)
            toast("Article's content copied to clipboard.")
        }}>
            <Copy className="w-4 h-4" />
            Copy Markdown
        </Button>
    )
}