import { useEffect } from "react"

const useDocumentKeyup = (key: string, cb: Function) => {
  useEffect(() => {
    const onKeyup = (e: KeyboardEvent) => {
      if (e.key === key) cb()
    }

    document.addEventListener("keyup", onKeyup)

    return () => {
      document.removeEventListener("keyup", onKeyup)
    }
  }, [cb])
}

export { useDocumentKeyup }
