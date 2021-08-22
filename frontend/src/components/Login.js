import React from 'react';
import { withRouter } from 'react-router-dom';
import * as auth from '../auth.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import './styles/Login.css';

class Login extends React.Component {
  static contextType = CurrentUserContext; // подключаем контекст
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    const value = this.context; // получаем значения из контекста
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    auth.authorize(this.state.password, this.state.email)
      .then((data) => {
        if (data.token) {
          value.onHeaderInfo('/', this.state.email);
          this.setState({
            email: '',
            password: ''
          }, () => {
            localStorage.setItem('jwt', data.token);
            value.handleLogin(); // подключаем метод из value
            this.props.history.push('/');
          })
        }
      })
      .catch(err => console.log(err));
  }
  render(){
    return(
      <div className="login">
        <h2 className="login__welcome">
          Вход
        </h2>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input required id="email" name="email" type="text" value={this.state.username} onChange={this.handleChange} />
          <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <button type="submit" className="login__link">Войти</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
