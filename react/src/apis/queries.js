export async function getTodos() {
    try {
        const response = await fetch("http://localhost:3000/api/to/all")
        const result = response.json()
        return result;
    } catch (err) {
        console.log("Error while fetching todos : ", err)
    }
}

export async function createTodos(newTodo) {
    console.log("Called create Todo");
    
    try {
        const response = await fetch("http://localhost:3000/api/to/create-todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({newTodo}),
        });

        // if (!response.ok) {
        //     throw new Error("Failed to create todo");
        // }

        const result = await response.json();

    } catch (err) {
        console.log("Error while fetching todos : ", err)
    }
}

