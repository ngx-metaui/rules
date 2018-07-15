import {Entity} from '@aribaui/core';

export class User implements Entity
{

    constructor(public firstName: string, public lastName: string,
                public age: number, public department: string,
                public email: string)
    {
    }


    identity(): string
    {
        return this.email;
    }

    /**
     *  $proto - to help out with object introspection
     *
     */
    $proto(): User
    {
        return new User('a', 'b', 1, 'c', 'd');
    }

    className(): string
    {
        return 'User';
    }


    getTypes(): any
    {
        return {};
    }
}


