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
    try {
        const response = await fetch("http://localhost:3000/api/to/create-todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({newTodo}),
        });

        if (!response.ok) {
            throw new Error("Failed to create todo");
        }

        const result = await response.json();
        console.log("Create Res : ",response)
        return result

    } catch (err) {
        console.log("Error while fetching todos : ", err)
    }
}

export async function patchTodos(updateTodo) {
    console.log('update Todo : ',updateTodo);
    
    try {
        const response = await fetch("http://localhost:3000/api/to/patch-todo", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({updateTodo}),
        });

        if (!response.ok) {
            throw new Error("Failed to update/patch todo");
        }

        const result = await response.json();
        return result

    } catch (err) {
        console.log("Error while updating todos : ", err)
    }
}

export async function deleteTodos() {
    try {
        const response = await fetch("http://localhost:3000/api/to/delete-todo", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete todo");
        }

        const result = await response.json();
        return result

    } catch (err) {
        console.log("Error while deleting todos : ", err)
    }
}
