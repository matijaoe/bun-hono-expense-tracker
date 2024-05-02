import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { api } from './lib/api'

function App() {
	const [totalSpent, setTotalSpent] = useState<number>(0)

	useEffect(() => {
		const fetchTotal = async () => {
			const res = await api.expenses.total.$get()
			const data = await res.json()
			return data.total
		}
		fetchTotal().then(setTotalSpent)
	}, [])

	return (
		<div className="p-8 max-w-2xl mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>Total spent</CardTitle>
					<CardDescription>Total amount you spent</CardDescription>
				</CardHeader>
				<CardContent>
					<p>${totalSpent.toLocaleString()}</p>
				</CardContent>
			</Card>
		</div>
	)
}

export default App
