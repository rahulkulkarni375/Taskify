export async function getTodos(){
    try{
        const response = await fetch("http://localhost:3000/api/to/all")
        const result = response.json()
        return result;
    }catch(err){
        console.log("Error while fetching todos : ",err)
    }
}