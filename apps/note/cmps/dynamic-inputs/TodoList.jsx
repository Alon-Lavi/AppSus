const { useState } = React

export function TodoList({ todos }) {
	const [todoList, setTodoList] = useState(todos)

	function handleTodoToggle(idx) {
		const updatedTodoList = [...todoList]
		updatedTodoList[idx].done = !updatedTodoList[idx].done
		setTodoList(updatedTodoList)
	}

	return (
		<ul>
			{todoList.map((todo, idx) => (
				<li key={idx} onClick={() => handleTodoToggle(idx)} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
					<p>{todo.text}</p>
				</li>
			))}
		</ul>
	)
}
