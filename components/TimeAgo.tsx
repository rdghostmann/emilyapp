// components/TimeAgo.tsx
"use client"

import { useEffect, useState } from "react"
import moment from "moment"

export default function TimeAgo({ date }: { date: string }) {
  const [timeAgo, setTimeAgo] = useState("")

  useEffect(() => {
    const update = () => setTimeAgo(moment(date).fromNow())
    update()

    const interval = setInterval(update, 60 * 1000) // update every minute
    return () => clearInterval(interval)
  }, [date])

  return <>{timeAgo}</>
}
