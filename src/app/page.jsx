/** @format */
'use client'

import { Button } from '@/components/ui/button'
import PercentageForm from '@/components/PercentageForm'
import { ModeToggle } from '@/components/ModeToggle'

export default function Home() {
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col justify-center gap-8 row-start-2 items-center'>
				<ModeToggle />
				<PercentageForm />
			</main>
		</div>
	)
}
