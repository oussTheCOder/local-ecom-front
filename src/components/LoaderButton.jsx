import { Loader2 } from "lucide-react"

export default function ButtonLoading({text}) {
  return (
    <span  className='flex gap-2 items-center ' disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {text}
    </span>
  )
}
