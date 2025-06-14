import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'

export const useRealtime = <T>(
  table: string,
  callback: (payload: T) => void
) => {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
        },
        (payload) => {
          callback(payload.new as T)
        }
      )
      .subscribe()

    setChannel(channel)

    return () => {
      channel.unsubscribe()
    }
  }, [table, callback])

  return channel
} 