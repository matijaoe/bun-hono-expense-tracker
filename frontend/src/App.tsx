import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'

function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="p-8 max-w-2xl mx-auto">
			<p className="mb-2 text-4xl">Hello world</p>

			<Button variant="default">Button</Button>
		</div>
	)
}

export default App
