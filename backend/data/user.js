import bcryptjs from "bcryptjs";

const users = [
    {
        name: "Achraf",
        email: "achraf6@gmail.com",
        password: bcryptjs.hashSync("0210", 10),
        isAdmin: true
    },
    {
        name: "User_one",
        email: "userone@gmail.com",
        password: bcryptjs.hashSync("0210", 10),
    },
    {
        name: "User_two",
        email: "usertwo@gmail.com",
        password: bcryptjs.hashSync("0210", 10),
    },
    
]


export default users