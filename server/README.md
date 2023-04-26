## Airways API Server
This server implemented with JSON server https://www.npmjs.com/package/json-server  
to start server change directory to '\server',  install dependencies (only if you haven't did it before) then run script ```start```   
```
cd server 
? npm i
npm run start
```  
by default server starts at http://localhost:3000/  

## Resources
 <details>
  <summary> /users </summary>

  ```
  [{
      email: "client@airways.com",
      password: "$2a$10$E7X3cbxT9khSYC"
      phone: { 
        code: "+49", 
        number: "666-842-1368",
      },
      firstName: "Vadim",
      lastName: "Koloskov",
      birthDate: "08.04.1994",
      gender: "Male",
      id: 6
  }]
  ```
  
</details>
 <details>
  <summary> /airports </summary>

  ```
  [
    {
      "city": "Brussels",
      "country": "Belgium",
      "code": "BRU"
    },
    {
      "city": "Sofia",
      "country": "Bulgaria",
      "code": "SOF"
    },
  ]
  ```
  
</details>

 <details>
  <summary> /trips </summary>

  ```
  [
    {
      "id": 3,
      "flightNo": "AV875",
      "from": "ATH",
      "to": "VIE",
      "departDate": "10.05.2023 10:10:00",
      "flightTime": 110,
      "arriveDate": "10.05.2023 12:00:00",
      "seats": 57,
      "price": 98
    },
  ]
  ```
  
</details>

To access and modify resources, you can use any HTTP method: GET POST PUT PATCH DELETE OPTIONS

## Rules
- to access users route (get user list) you need to be authorized
- to log in you need to use POST method to the */login* route with body that contains ```email``` and ```password``` params, any other params are ignored 
- to register new user you need to use POST method to the */register* route with body contains ```email``` and ```password``` params and any other params, that will be saved in users set
- you can access to special trip by its id with GET */trips/id*
- you can use any query request to filter result, for example:  
http://localhost:3000/trips?from=AMS&to=WAW return trips from Amsterdam airport to Warsaw  
http://localhost:3000/airports?code=TLV return Tel Aviv airport