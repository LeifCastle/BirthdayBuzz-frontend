"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signup = () => {
	const router = useRouter();

	const [redirect, setRedirect] = useState(false);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [number, setNumber] = useState('');
	const [streetAddress, setStreetAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [error, setError] = useState(false);

	// create the 
	const handleFirstName = (e) => {
		// fill in code
		setFirstName(e.target.value);
	};

	const handleLastName = (e) => {
		// fill in code
		setLastName(e.target.value);
	};

	const handleEmail = (e) => {
		// fill in code
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		// fill in code
		setPassword(e.target.value);
	};

	const handleJobTitle = (e) => {
		// fill in code
		setJobTitle(e.target.value);
	};

	const handleNumber = (e) => {
		// fill in code
		setNumber(e.target.value);
	};

	const handleStreetAddress = (e) => {
		// fill in code
		setStreetAddress(e.target.value);
	};

	const handleCity = (e) => {
		// fill in code
		setCity(e.target.value);
	};

	const handleState = (e) => {
		// fill in code
		setState(e.target.value);
	};

	const handleZipCode = (e) => {
		// fill in code
		setZipCode(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // at the beginning of a submit function

		const newUser = {
			firstName,
			lastName,
			email,
			jobTitle,
			number,
			password,
			streetAddress,
			city,
			state,
			zipCode
		};
		axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, newUser)
			.then(response => {
				setRedirect(true);
			})
			.catch(error => {
				if (error.response.data.message === 'Email already exists') {
					console.log('===> Error in Signup', error.response.data.message);
					setError(true);
				}
			});

	};

	if (redirect) { router.push('/users/login'); }
	if (error) {
		return (
			<div>
				<div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
					<div className="card-body text-center">
						<div>
							<p>Email already exists</p>
							<br />
							<h2>Login</h2>
							<p>Sign In to your account</p>
							<a href="/users/login" type="button" className="btn btn-primary active mt-3">Login</a>
							<span>  </span>
							<a href="/users/signup" type="button" className="btn btn-secondary active mt-3">Signup</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
	// You can have them redirected to profile (your choice)

	return (
		<div className="container">
			<br />
			<br />
			<br />
			<br />
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card-group mb-0">
						<div className="card p-4">
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<h1>Sign Up</h1>
									<p className="text-muted">Create an account below to get started</p>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-whatsapp"></i></span>
										<input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={handleFirstName} required/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-whatsapp"></i></span>
										<input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={handleLastName} required/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-mail-forward" aria-hidden="true"></i></span>
										<input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-lock"></i></span>
										<input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePassword} required/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="Job Title" value={jobTitle} onChange={handleJobTitle} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="Phone Number" value={number} onChange={handleNumber} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="Street Address" value={streetAddress} onChange={handleStreetAddress} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="City" value={city} onChange={handleCity} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="State" value={state} onChange={handleState} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="Zip Code" value={zipCode} onChange={handleZipCode} />
									</div>
									<div className="row">
										<div className="col-6">
											<button type="submit" className="btn btn-primary px-4">Sign Up</button>
										</div>
										<div className="col-6 text-right">
											<button type="button" className="btn btn-link px-0">Forgot password?</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
							<div className="card-body text-center">
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<div>
									<h2>Login</h2>
									<p>Sign In to your account</p>
									<a href="/users/login" type="button" className="btn btn-primary active mt-3">Login</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;