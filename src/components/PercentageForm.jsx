/** @format */

import { useRef, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useAtom } from 'jotai'
import {
	amountAtom,
	percentAtom,
	percentageAmountAtom,
	residualAmountAtom,
	residualTaxAtom,
} from '@/app/atoms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
// import PercentSlider from '@/components/PercentSlider'
import NumberFlow from '@number-flow/react'
import { DollarSign, Percent } from 'lucide-react'
import Logo from '@/components/Logo'
import { Separator } from '@radix-ui/react-dropdown-menu'

export default function Component() {
	const [amount, setAmount] = useAtom(amountAtom)
	const [percent, setPercent] = useAtom(percentAtom)
	const [percentageAmount] = useAtom(percentageAmountAtom)
	const [residualAmount] = useAtom(residualAmountAtom)
	const [residualTaxAmount] = useAtom(residualTaxAtom)

	// const [sliderValue, setSliderValue] = useState(0)

	const percentRef = useRef(null)
	const amountRef = useRef(null)

	const handleReset = () => {
		setAmount(0)
		setPercent(percent)
		percentRef.current.value = `${percent}`
		amountRef.current.value = ''
		amountRef.current.focus()
	}

	return (
		<Card className='min-w-[420px]'>
			<CardHeader className=''>
				<CardTitle className='flex items-end gap-2'>
					<Logo />
					PayPilot
				</CardTitle>
				<CardDescription>Quickly compute contractor payments.</CardDescription>
			</CardHeader>
			<CardContent>
				<form className='space-y-4 mb-6'>
					<Label className='text-xs font-bold'>
						Payment Amount
						<div className='relative flex rounded-lg shadow-sm shadow-black/5 mb-2'>
							<span className='font-medium pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground'>
								<DollarSign className='size-4 text-foreground' />
							</span>
							<Input
								className='ps-8 shadow-none text-base font-normal'
								placeholder='0'
								type='number'
								ref={amountRef}
							/>
						</div>
					</Label>
					{/* <PercentSlider onValueChange={(value) => setSliderValue(value)} /> */}
					<Label className='text-xs font-bold'>
						Contractor Percentage
						<div className='relative flex rounded-lg shadow-sm shadow-black/5'>
							<span className='font-medium pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm'>
								<Percent className='size-4 text-foreground' />
							</span>
							<Input
								className='ps-8 shadow-none text-base font-normal'
								placeholder='65'
								type='number'
								ref={percentRef}
								min={0}
								max={100}
								// Set default value
								defaultValue={percent}
								step={5}
							/>
						</div>
					</Label>
				</form>
				<div className='grid gap-2 dark:bg-card px-2 rounded-lg leading-none'>
					<div className='flex items-center justify-between w-full gap-2'>
						<span className='text-nowrap'>Contractor Payment:</span>
						{/* <div className='h-px border-t border-border border-dotted w-full'></div> */}
						<NumberFlow
							value={percentageAmount}
							locales='en-US'
							format={{
								style: 'currency',
								currency: 'USD',
								trailingZeroDisplay: 'stripIfInteger',
							}}
							className='font-bold text-lg mb-0'
						/>
					</div>
					<div className='flex justify-between items-center w-full gap-2'>
						<span className='text-nowrap'>Company Payment:</span>
						{/* <div className='h-px border-t border-border border-dotted w-full'></div> */}
						<NumberFlow
							value={residualAmount}
							locales='en-US'
							format={{
								style: 'currency',
								currency: 'USD',
								trailingZeroDisplay: 'stripIfInteger',
							}}
							className='font-bold text-lg'
						/>
					</div>
					<div className='flex justify-between items-center w-full gap-2'>
						<span className='text-nowrap'>Tax Amount:</span>
						{/* <div className='h-px border-t border-border border-dotted w-full'></div> */}
						{/* <Separator className='my-2 bg-border border-dashed h-px w-full' /> */}
						<NumberFlow
							value={residualTaxAmount}
							locales='en-US'
							format={{
								style: 'currency',
								currency: 'USD',
								trailingZeroDisplay: 'stripIfInteger',
							}}
							className='font-bold text-lg'
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter className='flex items-center gap-2'>
				<Button
					className='w-full text-base'
					onClick={() => {
						setAmount(parseFloat(amountRef.current.value) || 0)
						setPercent(parseFloat(percentRef.current.value) || 0)
					}}
				>
					Calculate
				</Button>
				<Button
					className='w-full text-base'
					variant='ghost'
					onClick={() => {
						handleReset()
					}}
				>
					Reset
				</Button>
			</CardFooter>
		</Card>
	)
}
