import type { NextApiRequest, NextApiResponse } from 'next'

type ConversionResponse = {
  result?: string
  error?: string
}

const baseMap: Record<string, number> = {
  binary: 2,
  octal: 8,
  decimal: 10,
  hexadecimal: 16,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConversionResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { inputValue, fromBase, toBase } = req.body

  if (
    !inputValue ||
    !fromBase ||
    !toBase ||
    !(fromBase in baseMap) ||
    !(toBase in baseMap)
  ) {
    return res.status(400).json({ error: 'Invalid parameters' })
  }

  try {
    const decimalValue = parseInt(inputValue, baseMap[fromBase])
    if (isNaN(decimalValue)) throw new Error('Invalid input value')

    const result =
      toBase === 'decimal'
        ? decimalValue.toString()
        : decimalValue.toString(baseMap[toBase])

    return res.status(200).json({ result })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
