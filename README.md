## React code for allemps a job site

> using pocketbase in prototyping and testing willmigate to pyhon and postgress

**Authentication flow for new users**
- create account with email and password

request shape:
```ts
{
    email:string,
    password:string,
}
```

> auth end should be able to handle email and password account creatiion and create a user profile with the initial data of name country city and pic , should also handle saving the image and generating an image url that will be saved in the database in the pic field m ai should also be able to keep track of logged in users [reference 1](https://stackoverflow.com/questions/69963975/how-to-set-cookie-from-flask-to-reactjs)
[reference 2](https://stackoverflow.com/questions/62473806/how-to-cache-a-variable-with-flask)

- after email and password are accepted , we add user detatls to the profile (at least 70% needed for a valid profile)

```ts
{
    name:string
    avatar:image File
    country:string,
    bio:string required,
    cv:string google doc link,
    brief_description:string,
    jobtype:string keywords with spaces,
    employment_status:"hired"|"hired and searching"| "unhired and searching"

}
```

>api should be able to handle files , have a job types api endpoit to enable filtering for jobs instaed of using user entered keywords

final user profile record should look like
```ts
{
    email:string,
    password:string hashed password,
    name:string
    country:string,
    avatar:string file url,
    bio:string required,
    cv:string google doc link,
    brief_description:string,
    jobtype:string keywords with spaces,
    employment_status:"hired"|"hired and searching"| "unhired and searching",
    

}
```

hosted on vercel
