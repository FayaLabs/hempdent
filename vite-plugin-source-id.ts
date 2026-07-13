/**
 * Vite plugin that injects data-source-id attributes into JSX elements.
 * Enables the Design Tab to map DOM elements back to exact source locations.
 *
 * Dev-only (apply: 'serve') — never included in production builds.
 * Zero npm dependencies — uses regex-based transform.
 */

import type { Plugin } from 'vite'

// TypeScript type keywords that can follow < in type positions — never valid JSX tags
const TS_TYPE_KEYWORDS = new Set([
  'typeof', 'keyof', 'infer', 'extends', 'readonly',
  'never', 'void', 'null', 'undefined', 'any', 'unknown',
  'string', 'number', 'boolean', 'symbol', 'bigint', 'object',
])

export default function sourceIdPlugin(): Plugin {
  return {
    name: 'vite-plugin-source-id',
    enforce: 'pre',
    apply: 'serve',

    transform(code: string, id: string) {
      // Only process TSX/JSX files in the src directory
      if (!/\.(tsx|jsx)$/.test(id)) return null
      if (id.includes('node_modules')) return null

      // Get the relative path from project root
      const srcIndex = id.lastIndexOf('/src/')
      const filePath = srcIndex !== -1 ? id.slice(srcIndex + 1) : id.split('/').slice(-2).join('/')

      const lines = code.split('\n')
      const result: string[] = []

      for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
        const line = lines[lineIdx]

        // Replace JSX opening tags on this line
        // Matches: <div, <Button, <my-component — but not closing tags, fragments, or already-annotated tags
        const replaced = line.replace(
          /<([A-Z][a-zA-Z0-9.]*|[a-z][a-z0-9-]*)(?=[\s\n>\/])/g,
          (match, tagName, offset) => {
            // Skip if preceded by word char or dot — this is a TypeScript generic, not JSX
            // e.g. React.forwardRef<, Array<string>, ElementRef<typeof ...>
            if (offset > 0 && /[\w.]/.test(line[offset - 1])) return match

            // Skip TypeScript type keywords (typeof, keyof, etc.)
            if (TS_TYPE_KEYWORDS.has(tagName)) return match

            // Skip if this is inside a comment or string
            const before = line.slice(0, offset)
            if (before.includes('//') || before.includes('/*')) return match

            // Skip closing tags (the char before < is /)
            if (offset > 0 && line[offset - 1] === '/') return match

            // Skip fragments (<> and </>)
            if (tagName === '') return match

            // Skip if the tag already has data-source-id
            const afterTag = line.slice(offset + match.length)
            if (afterTag.trimStart().startsWith('data-source-id')) return match

            // Skip imports and type annotations
            if (before.includes('import ') || before.includes('from ')) return match

            const col = offset
            return `${match} data-source-id="${filePath}:${lineIdx + 1}:${col}"`
          }
        )

        result.push(replaced)
      }

      const newCode = result.join('\n')
      if (newCode === code) return null

      return { code: newCode, map: null }
    },
  }
}
