
const LoginPage = () => {
  return (
    <div>
        <h1>Sign in</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <label htmlFor="remember-me">Remember Me</label>
        <input type="checkbox" id="remember-me" />
        <a href="#">Forgot Password</a>
    </div>
  )
}

export default LoginPage