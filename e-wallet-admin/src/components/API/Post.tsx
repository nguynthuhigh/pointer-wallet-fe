export async function updateUsers(id:string,inactive:boolean) {
    const response = await fetch(`https://api-presspay.azurewebsites.net/api/v1/user/get-users?${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inactive)
    })
    return response.json;
    
}
    