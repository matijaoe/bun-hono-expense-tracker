import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import React from 'react'

const TanStackRouterDevtools =
	process.env.NODE_ENV === 'production'
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import('@tanstack/router-devtools').then((res) => ({
					default: res.TanStackRouterDevtools,
				}))
			)

const routes = [
	{
		to: '/',
		label: 'Home',
	},
	{
		to: '/about',
		label: 'About',
	},
	{
		to: '/expenses',
		label: 'Expenses',
	},
]

export const Route = createRootRoute({
	component: Root,
})

function Navbar() {
	return (
		<div className="p-2 flex gap-2">
			{routes.map((route, index) => (
				<Link
					key={index}
					to={route.to}
					className="[&.active]:font-bold"
				>
					{route.label}
				</Link>
			))}
		</div>
	)
}

function Root() {
	return (
		<>
			<Navbar />

			<hr />

			<div className="max-w-2xl mx-auto p-2">
				<Outlet />
			</div>

			<TanStackRouterDevtools />
		</>
	)
}
