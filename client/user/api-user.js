
// Create new user
const create = async (user) => {
    try {
        let response = await fetch('/api/users', {
          method: 'POST',
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        })

        return await response.json()
    } catch(err) {
        console.log('Error: ', err)
    }
}

// List all users
const list = async (signal) => {
    try {
        let response = await fetch('/api/users', {
            method: 'GET',
            signal: signal
        })
        
        return await response.json()
    } catch(err) {
        console.log("Error: ", err)
    }
}

// Read a single user
const read = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            }
        })

        return await response.json()
    } catch(err) {
        console.log('Error: ',err)
    }
}

// Update user
const update = async (params, credentials, user) => {
    try {   
        let response = await fetch('/api/users/' + params.userId, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            body: JSON.stringify(user)
        })

        return await response.json()
    } catch(err) {
        console.log("Error: ", err)
    }
}

// delete user
const remove = async (params, credentials) => {
    try {   
        let response = await fetch('/api/users/' + params.userId, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            }
        })

        return await response.json()
    } catch(err) {
        console.log("Error: ", err)
    }
}

export {
    create,
    read,
    list,
    update,
    remove
}