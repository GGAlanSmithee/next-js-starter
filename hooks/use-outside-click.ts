import { MutableRefObject, useEffect } from "react"

const useOutsideClick = (ref: MutableRefObject<HTMLElement | null>, cb: Function) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target && ref.current && !ref.current.contains(e.target as Node)) {
        cb()
      }
    }

    document.addEventListener("mousedown", onClick)

    return () => {
      document.removeEventListener("mousedown", onClick)
    }
  }, [ref, cb])
}

export { useOutsideClick }
