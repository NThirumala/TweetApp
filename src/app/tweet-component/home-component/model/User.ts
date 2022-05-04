export class User {
   id: String
	 firstName: String
	 lastname: String
	 gender: String
	 dob: String
	 email: String
	 password: String
	 contactnumber: String

    constructor(  id: String,
          firstName: String,
          lastname: String,
          gender: String,
          dob: String,
          email: String,
          password: String,
          contactnumber: String){
            this.id= id;
            this.firstName= firstName;
            this.lastname= lastname;
            this.gender= gender;
            this.dob= dob;
            this.email= email;
            this.password= password;
            this.contactnumber= contactnumber;
          }
}