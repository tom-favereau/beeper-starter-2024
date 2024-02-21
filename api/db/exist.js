import {queryNormalized} from "./connection-pool.js"

export async function exists(username) {
    const result = await queryNormalized("SELECT name FROM users");
  
    // Extract the 'name' property from each result object
    const nameList = result.map(item => item.name);
  
    //console.log(nameList);
    //console.log(username);
    //console.log(nameList.includes(username));
    // Check if the provided username is in the nameList
    return nameList.includes(username);
}