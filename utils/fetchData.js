async function fetchData({method, url, body, token}) {
    const options = {
        method: method,
        headers: {
            'Accept': 'application/pdf'
        },
    }

    if(method==="POST" || method==="PUT" || method==="PATCH"){
        options.body = JSON.stringify(body)
    }
    if(token){
        options.headers["Authorization"] = `Bearer ${token}`
    }
    try{
    const response = await fetch(`/api${url}`, options)
        try{
            // const data = await response.json()
            return response
        }catch(e){
            console.log(e)
        }
    }catch(e){
        console.log(e)
    }
  }

  export default fetchData