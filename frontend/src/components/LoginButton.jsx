const LoginButton = () => {
    const handleLogin = () => {
      window.location.href = "http://localhost:5000/auth/github"; // Redirect to backend
    };
  
    return (
      <button onClick={handleLogin} className="btn">
        Login with GitHub
      </button>
    );
  };
  
  export default LoginButton;
  