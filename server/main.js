import _ from 'lodash';
import {Meteor} from 'meteor/meteor';
import {Employees} from '../imports/collections/employees';
import {image, helpers} from 'faker';

Meteor.startup(()=>{

//Check to see if data exists in the collection
//see if the collection has any records
const numberRecords = Employees.find({}).count();

if (!numberRecords){
	//Generate some data
	_.times(5000,()=>{
		const {name, email, phone } = helpers.createCard(); 
		//const name = helpers.createCard().name;
		//const email = helpers.createCard().email;
		//const phone = helpers.createCard().phone;
		Employees.insert({
			name: name,
			email: email,
			phone: phone,
			avatar: image.avatar()
		});
	});
}
Meteor.publish('employees', function(per_page){
	return Employees.find({},{limit: per_page});
});
});
