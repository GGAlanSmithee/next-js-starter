import React from "react"

interface Props {
  label: string
  symbol: string
}

const Emoji = ({ label, symbol }: Props) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </span>
)

export { Emoji }
