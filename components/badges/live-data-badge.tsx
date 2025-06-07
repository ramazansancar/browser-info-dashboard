import { Activity } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface LiveDataBadgeProps {
  className?: string
  updateInterval?: string
}

export function LiveDataBadge({
  className = '',
  updateInterval = 'gerçek zamanlı',
}: LiveDataBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Activity className={`h-4 w-4 animate-pulse text-emerald-500 ${className}`} />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Bu veri {updateInterval} güncellenir</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
