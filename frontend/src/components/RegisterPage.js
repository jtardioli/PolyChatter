const RegisterPage = () => {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>
          Name
          <input type="text" name="name" />
        </label>

        <label>
          Username:
          <input type="text" name="username" />
        </label>

        <label>
          Email:
          <input type="email" name="email" />
        </label>

        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </form>
    </div>
  );
};

export default RegisterPage;
