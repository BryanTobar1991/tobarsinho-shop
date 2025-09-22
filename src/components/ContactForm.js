import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


class ContactForm extends Component {
constructor(props) {
super(props);
this.state = { name: '', email: '', message: '', loading: false, success: null };
this.validator = new SimpleReactValidator();
}


handleChange = (e) => this.setState({ [e.target.name]: e.target.value });


handleSubmit = async (e) => {
e.preventDefault();
if (this.validator.allValid()) {
this.setState({ loading: true });
try {
await addDoc(collection(db, 'contacts'), {
name: this.state.name,
email: this.state.email,
message: this.state.message,
createdAt: serverTimestamp()
});
this.setState({ success: 'Enviado correctamente', name: '', email: '', message: '' });
this.validator.hideMessages();
} catch (err) {
console.error(err);
this.setState({ success: 'Error al enviar' });
} finally {
this.setState({ loading: false });
}
} else {
this.validator.showMessages();
this.forceUpdate();
}
}


render() {
return (
<form onSubmit={this.handleSubmit} className="p-3">
<div className="mb-3">
<label className="form-label">Nombre</label>
<input name="name" className="form-control" value={this.state.name} onChange={this.handleChange} />
{this.validator.message('name', this.state.name, 'required|min:3')}
</div>


<div className="mb-3">
<label className="form-label">Email</label>
<input name="email" className="form-control" value={this.state.email} onChange={this.handleChange} />
{this.validator.message('email', this.state.email, 'required|email')}
</div>


<div className="mb-3">
<label className="form-label">Mensaje</label>
<textarea name="message" className="form-control" rows="4" value={this.state.message} onChange={this.handleChange}></textarea>
{this.validator.message('message', this.state.message, 'required|min:10')}
</div>