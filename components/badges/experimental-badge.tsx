import { FlaskConical } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ExperimentalBadgeProps {
  className?: string
}

export function ExperimentalBadge({ className = '' }: ExperimentalBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <FlaskConical className={`h-4 w-4 text-purple-500 ${className}`} />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">
            Bu özellik deneysel bir API kullanır ve tüm tarayıcılarda desteklenmeyebilir
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
