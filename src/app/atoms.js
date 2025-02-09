/** @format */

import { atom } from 'jotai'

export const amountAtom = atom(0)
export const percentAtom = atom(65)
export const percentageAmountAtom = atom(
	(get) => (get(amountAtom) * get(percentAtom)) / 100,
)
export const residualAmountAtom = atom(
	(get) => get(amountAtom) - get(percentageAmountAtom),
)

export const residualTaxAtom = atom((get) => get(residualAmountAtom) * 0.3)
