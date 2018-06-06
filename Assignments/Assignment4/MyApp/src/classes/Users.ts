import User from './User';
class Users {
    constructor(private users:User[]) {

    }

    updateUser(username:string, password:string, age:string) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === username) {
                this.users[i].setPassword(password);
                this.users[i].setAge(age);
                console.log('Update complete\n');
                break;
            }
        }
    }

    checkIfExist(username:string) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === username) {
                return true;
            }
        }
        return false;
    }

    getUserAge(user:string) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === user) {
                return this.users[i].getAge();
            }
        }
        return -1;
    }

    addUser(username:string, password:string, age:string) {
        var user = new User(username, password, age);
        var flag = 0;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === user.getUsername()) {
                flag = 1;
            }
        }
        if (flag === 0) {
            this.users.push(user);
            console.log('name created\n');
        } else {
            console.log("The username is already exist!");
        }

    }

    removeUser(username:string) {
        var flag = 0;
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].getName() === username) {
                flag = 1;
                this.users.splice(i, 1);
                console.log('the name removed\n');
                break;
            }
        }
        if (flag === 0) {
            console.log("The Username doesn't exist!!");
        }
    }

    print() {
        if (this.users.length) {
            for (var i = 0; i < this.users.length; i++) {
                console.log(this.users[i].getName());
            }
        } else {
            console.log("There is not users in the list\n");
        }
    }
}

export default Users;