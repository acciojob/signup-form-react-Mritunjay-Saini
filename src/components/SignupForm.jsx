import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male',
    phoneNumber: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, gender, phoneNumber, password } = formData;

    if (!name || !email || !phoneNumber || !password) {
      return 'All fields are mandatory.';
    }

    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      return 'Name is not alphanumeric.';
    }

    if (!email.includes('@')) {
      return 'Email must contain @.';
    }

    if (!['male', 'female', 'other'].includes(gender)) {
      return 'Please identify as male, female or others.';
    }

    if (!/^\d+$/.test(phoneNumber)) {
      return 'Phone Number must contain only numbers.';
    }

    if (password.length < 6) {
      return 'Password must contain atleast 6 letters.';
    }

    return ''; // no error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();

    if (error) {
      setMessage(error);
    } else {
      const username = formData.email.split('@')[0];
      setMessage(`Hello ${username}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            data-testid="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            data-testid="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Gender: </label>
          <select
            data-testid="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>

        <div>
          <label>Phone Number: </label>
          <input
            data-testid="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            data-testid="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button data-testid="submit" type="submit">
          Submit
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupForm;
