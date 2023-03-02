import { DocumentStore } from 'ravendb';

class User {
    constructor({ name}) {
        id: null,
        this.Name= name;
    }
}

class Raven
{
    constructor() {
        this.session;
    }


        

    async init()
    {
        const store = new DocumentStore('http://127.0.0.1:8080/', 'test');
        store.initialize();
        
        this.session = store.openSession();
    }


    //console.log("hi");


    /*
    let user = await session.load('users/1-A');
    user.password = PBKDF2('new password');
    await session.saveChanges();

    session.load('Users/1-A')
        .then((user) => {
            user.password = PBKDF2('new password');
        })
        .then(() => session.saveChanges())
        .then(() => {
            // here session is complete
        });
    */  
    async Load()
    {
        this.init();
        //const users = session.load('users');
        const users = await this.session.query({ collection: "users" }).all();
        //console.log();
        //console.log('users = ' + users[0]);
        //console.log('users length = ' + users.length);

        let objects = new Array();
        for(let i = 0; i < users.length; i++)
        {
            let arr = new Array(users[i].id, users[i].Name);
            objects.push(arr);
//            objects.push(users[i].Name);
        }
        //console.log(objects);
        return objects;
    }



    async Create(name)
    {
        this.init();
        let user1 = {
            id: null,
            Name: name
        };
        const user = new User({name});
        
        await this.session.store(user);
        //console.log('New USER ID = ' + user.Name); // products/1-A
        //console.log('New USER ID = ' + user.id); // products/1-A
        await this.session.saveChanges();
    }



    async deleteUser(name)
    {
        //console.log(name);
        this.init();
        const user = await this.session.load(name);
        /*
        const user = await this.session.query({ collection: "users" })
        .whereEquals("Name", name)
        .all();
        */
        this.session.delete(user);
        this.session.saveChanges();
    }


    async upd(name, next)
    {
        this.init();
        //console.log(name);
        //console.log(next);
        
        const user = await this.session.load(name);
        


        /*
        const user = await this.session.query({ collection: "users" })
        .whereEquals("Name", name)
        .all();
        */
        user.Name = next;
        this.session.saveChanges();
        return user;
    }
    //console.log();
/*
    async getAllUserNames()
    {
        let users = Load().then((res)=>{
            for(let i = 0; i < res.length; i++)
            {
                console.log(res[i].Name);
            }
        });
    }

*/
    //console.log('loaded');
    //Create('534635');
    /*
    console.log("c1");
    Create('hiMan1');
    console.log('c2');
    Create('hiMan2');
    console.log('c3');
    Create('hiMan3');
    console.log('c4');
    */
    /*
    Upd("hiMan2", "hiMan5").then(()=>{
        console.log('c5');
    })
    */
    //console.log('start');
    //let text = upd('1', '1');
    //console.log(text);
    //console.log('end');
    //deleteUser('1');
    //console.log('c6');

}

let raven = new Raven();

export default raven;