```jsx
<>

            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-5">
                        <div className="card cardbox">
                            <div className="card-header">Register</div>
                            <div className="card-body">

                                <div className="social-buttons">
                                    <a href="#" className="btn btn-md btn-block btn-fb"><i className="fa fa-facebook"></i> Facebook</a>
                                    <a href="#" className="btn btn-md btn-block btn-tw"><i className="fa fa-twitter"></i> Twitter</a>
                                </div>

                                <div className="login-or">
                                    <hr className="hr-or" />
                                    <span className="span-or">or</span>
                                </div>

                                <div className="form-group">

                                    <form id="login-nav" method="post" role="form" className="form" accept-charset="UTF-8">

                                        <div className="form-group">
                                            <label className="sr-only">Username</label>
                                            <input type="text" id="reg_username" name="user_name" className="form-control"
                                                value="" placeholder="Username" required />
                                        </div>

                                        <div className="form-group">

                                            <label className="sr-only">Password</label>
                                            <div className="input-group">
                                                <input type="password" id="reg_userpassword" name="user_password" className="form-control" data-placement="bottom" data-toggle="popover" data-container="body"
                                                    data-html="true" value="" placeholder="Password" required />

                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type="button" id="button-append1" onclick="togglePassword()">
                                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="progress mt-1" id="reg-password-strength">
                                                <div id="password-strength" className="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width:"0%"}}>
                                                </div>
                                            </div>
                                            <div className="help-block text-right">
                                                <small><a href="#">Forgot Password</a></small>
                                                <span id="reg-password-quality" className="hide pull-left block-help">
                                                    <small>Password <span id="reg-password-quality-result"></span></small>
                                                </span>
                                            </div>
                                            <div id="reg_passwordrules" className="hide password-rule mt-2"><small>

                                                <ul className="list-unstyled">
                                                    <li className="">
                                                        <span className="eight-character"><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                                                        &nbsp; min 8 character</li>
                                                    <li className="">
                                                        <span className="low-upper-case"><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                                                        &nbsp; min 1 uppercase & 1 lowercase character</li>
                                                    <li className="">
                                                        <span className="one-number"><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                                                        &nbsp; min 1 number</li>
                                                    <li className="">
                                                        <span className="one-special-char"><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                                                        &nbsp; min 1 special char (!@#$%^&*)</li>
                                                </ul>
                                            </small></div>

                                        </div>

                                        <div className="form-group">

                                            <label className="sr-only">Password Confirm</label>
                                            <div className="input-group">
                                                <input type="password" id="reg_userpasswordconfirm" className="form-control" data-placement="bottom"
                                                    data-toggle="popover" data-container="body" data-html="true" placeholder="Password Confirm" required />

                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary" type="button" id="button-append2" onclick="togglePassword()">
                                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                                    </button>
                                                </div>

                                            </div>
                                            <div className="help-block text-right">
                                                <small><span id="error-confirmpassword" className="hide pull-right block-help">
                                                    <i className="fa fa-info-circle text-danger" aria-hidden="true"></i>Don't match password'</span></small>
                                            </div>

                                        </div>

                                        <div className="form-group">
                                            <label className="sr-only">E-mail Address</label>
                                            <input type="email" id="reg_useremail" name="user_email" className="form-control"
                                                value="" placeholder="xxx@xxx.com" />
                                        </div>

                                        <div className="form-group">
                                            <label className="sr-only">Questions</label>
                                            <select id="reg_userquestion" className="form-control" name="user_question">
                                                <option selected> Select Questions </option>
                                                <option>What's favorite color?</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="sr-only">Answer</label>
                                            <input type="text" id="reg_useranswer" name="user_answer" className="form-control"
                                                value="" placeholder="Are you Answers" />
                                        </div>

                                        <div className="form-group">
                                            <button id="reg_submit" name="submit" value="1" className="btn btn-block btn-primary" disabled="disabled">Create user</button>
                                            <div id="sign-up-popover" className="hide"><p>is empty</p></div>
                                        </div>

                                        <div className="form-check">
                                            <input type="checkbox" id="reg_remember" name="user_remember" className="form-check-input" value="1" />
                                            <label className="form-check-label">Remember me</label>
                                        </div>

                                    </form>
                                </div>

                                <div className="login-or"><hr className="hr-or" /></div>
                                <div className="bottom text-center">
                                    Are you user? <a href="#"><b>Login</b></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
```

```jsx
'use client';
// import 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
import 'bulma/css/bulma.min.css';
import '../../signup.module.css';
export default function Signup() {
    return (
        <div className='page'>
            <div className="container h-100">
    		<div className="row h-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Get started</h1>
							<p className="lead">
								Start creating the best possible user experience for you customers.
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<form>
										<div className="form-group">
											<label>Name</label>
											<input className="form-control form-control-lg" type="text" name="name" placeholder="Enter your name" />
										</div>
										<div className="form-group">
											<label>Company</label>
											<input className="form-control form-control-lg" type="text" name="company" placeholder="Enter your company name" />
										</div>
										<div className="form-group">
											<label>Email</label>
											<input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" />
										</div>
										<div className="form-group">
											<label>Password</label>
											<input className="form-control form-control-lg" type="password" name="password" placeholder="Enter password" />
										</div>
										<div className="text-center mt-3">
											<a href="index.html" className="btn btn-lg btn-primary">Sign up</a>
											<button type="submit" className="btn btn-lg btn-primary">Sign up</button>
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
        </div>
    );
}
```