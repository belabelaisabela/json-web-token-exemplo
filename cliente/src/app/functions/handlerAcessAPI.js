'use server'

const url = "http://localhost:4000";

const getUserAuthenticated = async (user) => {
    const responseOfApi = await fetch(url + "/user/authenticated",
        {
            method:"POST",
            headers:{ "Content-type":"Application/json" },
            body: JSON.stringify(user)
        }
    );
    const userAuth = await responseOfApi.json();
    return userAuth;
}

const postUser = async (user) => {
    try{
        console.log(user)
        const responseOfApi = await fetch(url + "/user", {
            method: 'POST',
            headers: { 'Content-type': 'Application/json' },
           body: JSON.stringify(user) 
        });
        const userSave = await responseOfApi.json();
        return userSave;
    }
    catch {
        return null;
    }
}

const getUsers = async() =>{
    try{
        const responseOfApi = await fetch( url + "/users",{
            next: { revalidate: 5}
        });
        const listUsers = responseOfApi.json()
        return listUsers;
    } catch{
        return null
    }

}

const updateUser = async (user, id) => {
    const token = cookies().get('token')?.value;
    try{
        const responseOfApi = await fetch(`${url}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
                Cookie: `token=${token}`
            },
            body: JSON.stringify(user)
        });
        const userSave = await responseOfApi.json();
        return userSave;
    } catch {
        return null;
    }
}

export { getUsers, getUserAuthenticated, postUser };