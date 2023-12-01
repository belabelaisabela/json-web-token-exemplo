'use server'

import { cookies } from "next/dist/client/components/headers";

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
    const token = cookies().get("token")?.value
    try{
        console.log(user)
        const responseOfApi = await fetch(url + "/usuarios/cadastrar", {
            method: 'POST',
            headers: { 'Content-type': 'Application/json',  Cookie: `token=${token}` },
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
    const token = cookies().get("token")?.value
    try{
        const responseOfApi = await fetch( url + "/usuarios/listar",{
            next: { revalidate: 5},
            headers: { 'Content-type': 'Application/json',
            Cookie: `token=${token}`,
        },

        });
        const listUsers = responseOfApi.json()
        return listUsers;
    } catch{
        return null
    }

}


export { getUsers, getUserAuthenticated, postUser };