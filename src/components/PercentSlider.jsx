/** @format */

'use client'

import { useSliderWithInput } from '@/hooks/use-slider-with-input'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { RotateCcw } from 'lucide-react'

export default function PercentSlider({ onValueChange, handleInputChange }) {
	const minValue = 0
	const maxValue = 100
	const initialValue = [65]
	const defaultValue = [65]

	const {
		sliderValue,
		inputValues,
		validateAndUpdateValue,
		handleInputChange,
		handleSliderChange,
		resetToDefault,
	} = useSliderWithInput({ minValue, maxValue, initialValue, defaultValue })

	// Use the hook's handleSliderChange and notify parent
	const handleChange = (newValue) => {
		handleSliderChange(newValue)
		onValueChange?.(newValue[0])
	}

	return (
		<div className='space-y-3'>
			<div className='flex items-center justify-between gap-2'>
				<Label className='text-xs font-bold'>Contractor Percentage</Label>
				<div className='flex items-center gap-1'>
					<TooltipProvider delayDuration={0}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									size='icon'
									variant='ghost'
									className='size-7'
									aria-label='Reset'
									onClick={resetToDefault}
								>
									<RotateCcw size={16} strokeWidth={2} aria-hidden='true' />
								</Button>
							</TooltipTrigger>
							<TooltipContent className='px-2 py-1 text-xs'>
								Reset to default
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<Input
						className='h-7 w-12 px-2 py-0'
						type='text'
						inputMode='decimal'
						value={inputValues[0]}
						onChange={(e) => handleInputChange(e, 0)}
						onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								validateAndUpdateValue(inputValues[0], 0)
							}
						}}
						aria-label='Enter value'
					/>
				</div>
			</div>
			<div className='flex items-center gap-4'>
				<Slider
					className='grow'
					value={sliderValue}
					onValueChange={handleChange}
					min={minValue}
					max={maxValue}
					step={5}
					aria-label='Temperature'
				/>
			</div>
		</div>
	)
}
