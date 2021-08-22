import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles/Register.css';
import * as auth from '../auth.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = this.state;
    auth.register( password, email).then((res) => {
      if(res){
        this.setState({
          message: ''
        }, () => {
          this.props.onSuccessfulRegistration();
          this.props.onInfoTooltip();
          //this.props.history.push('/sign-in');
        })
      } else {
        this.setState({
          message: 'Что-то пошло не так!'
        }, () => {
          this.props.onFailedRegistration();
          this.props.onInfoTooltip();
        })
      }
    });
  }
  render(){
    return (
      <div className="register">
        <h2 className="register__welcome">
          Регистрация
        </h2>
        <form onSubmit={this.handleSubmit} className="register__form">
          <input id="email" name="email" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Email" />
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Пароль" />
          <button type="submit" onSubmit={this.handleSubmit} className="register__link">Зарегистрироваться</button>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link onClick={() => this.props.onHeaderInfo(this.props.headerInfo.path)} to="sign-in" className="register__login-link">Войти</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
