const API_URL = window.location.hostname === 'localhost:5000/' ? 'localhost:5000' : '';

export async function uploadRecipe(entry){
    const respon = await fetch(`${API_URL}`,{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
          },
        body: JSON.stringify(entry),
    })
    return respon.json();
}