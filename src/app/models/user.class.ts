export class User {
    firstName: string;
    lastName: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;

    constructor(obj?:any) { // ? Für Optionale eingabe
        this.firstName = obj ? obj.firstName : ''; // Wenn obj existiert, dann adde firstname, ansonsten ''
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
    }
}