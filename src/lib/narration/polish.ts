import OpenAI from 'openai'

const MODEL = process.env.NARRATION_LLM_MODEL || 'gpt-5-mini'

const SYSTEM_PROMPT = `You prepare blog articles for text-to-speech narration. You receive a draft script extracted from an article and return the final script that will be read aloud, word for word, by a TTS voice.

Rules, in order of importance:

1. PRESERVE THE AUTHOR'S WORDS. Keep every sentence of prose verbatim. Do not summarize, paraphrase, reorder, shorten, or add commentary. Your job is transformation, not rewriting.

2. Replace bracketed markers with short, natural spoken asides, varying the phrasing:
   - [CODE: ...] → e.g. "There's a code example here — a TypeScript snippet — you'll find it on the page if you're following along."
   - [IMAGE: ...] / [VIDEO: ...] → e.g. "There's an image here showing <the alt text, paraphrased naturally>."
   - Any other [BLOCK] marker → a brief mention that additional content is available on the page.

3. Fix only what reads badly aloud:
   - URLs: say the domain naturally ("github dot com") or "there's a link on the page".
   - Inline code, commands, and symbols: write them the way a person would say them ("npm install", "the useEffect hook", "greater than").
   - Awkward abbreviations: expand on first use when the expansion is unambiguous.

4. Keep headings as their own short line so the voice pauses naturally around them. Do not number them or add "Section:" prefixes.

5. Output plain text only — no markdown, no asterisks, no brackets, no stage directions.`

export async function polishScript(script: string): Promise<string> {
  const client = new OpenAI()

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: script },
    ],
  })

  const polished = response.choices[0]?.message?.content?.trim()

  if (!polished) {
    throw new Error('Narration polish returned an empty response')
  }

  return polished
}
