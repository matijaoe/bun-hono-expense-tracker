import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/expenses')({
	component: Expenses,
})

const fetchExpenses = async () => {
	const res = await api.expenses.$get()
	const data = await res.json()
	return data
}

function Expenses() {
	const { data, isPending, error } = useQuery({
		queryKey: ['expenses'],
		queryFn: fetchExpenses,
	})

	if (error) {
		return <div>Error has occurred: {error.message}</div>
	}

	return (
		<div>
			<Table>
				<TableCaption>A list of all your expenses.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isPending
						? Array(3)
								.fill(0)
								.map((_, i) => (
									<TableRow key={i}>
										<TableCell className="font-medium">
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
										<TableCell>
											<Skeleton className="h-4" />
										</TableCell>
									</TableRow>
								))
						: data?.expenses.map((expense) => (
								<TableRow key={expense.id}>
									<TableCell className="font-medium">{expense.id}</TableCell>
									<TableCell>{expense.title}</TableCell>
									<TableCell>{expense.amount}</TableCell>
								</TableRow>
							))}
				</TableBody>
			</Table>
		</div>
	)
}
