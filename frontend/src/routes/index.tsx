import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from '../lib/api'

export const Route = createFileRoute('/')({
	component: Index,
})

const getTotalSpent = async () => {
	const res = await api.expenses.total.$get()
	const data = await res.json()
	return data
}

function Index() {
	const { data, error, isFetching } = useQuery({
		queryKey: ['expenses', 'total'],
		queryFn: getTotalSpent,
	})

	return (
		<div className="p-8 max-w-2xl mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>Total spent</CardTitle>
					<CardDescription>Total amount you spent</CardDescription>
				</CardHeader>
				<CardContent>
					{error ? (
						<p>$???</p>
					) : (
						<p>{isFetching ? '...' : <>${data?.total.toLocaleString()}</>}</p>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
