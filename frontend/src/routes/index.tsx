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
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
	component: Index,
})

const getTotalSpent = async () => {
	const res = await api.expenses.total.$get()
	const data = await res.json()
	return data
}

function Index() {
	const { data, error, isPending, isFetching, refetch } = useQuery({
		queryKey: ['expenses', 'total'],
		queryFn: getTotalSpent,
	})

	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Total spent</CardTitle>
					<CardDescription>Total amount you spent</CardDescription>
				</CardHeader>
				<CardContent>
					{error ? (
						<p>$???</p>
					) : (
						<p>{isPending ? '...' : <>${data?.total.toLocaleString()}</>}</p>
					)}

					<div className="mt-4 flex justify-end">
						<Button
							onClick={() => refetch()}
							disabled={!isPending && isFetching}
						>
							{!isPending && isFetching ? '...' : 'refresh'}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
