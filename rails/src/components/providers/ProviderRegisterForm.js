import React, { Component } from 'react';

const DEFAULT_STATE = {
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  specialty: '',
  street_one: '',
  street_two: '',
  city: '',
  user_state: '',
  zipcode: '',
  email: '',
  phone: '',
  errors: []
}

export default class ProviderRegisterForm extends Component {
  state = {
    ...DEFAULT_STATE
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDateChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      username: this.state.username,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      specialty: this.state.specialty,
      street_one: this.state.street_one,
      street_two: this.state.street_two,
      city: this.state.city,
      state: this.state.user_state,
      zipcode: this.state.zipcode,
      email: this.state.email,
      phone: this.state.phone,
    }

    fetch(this.props.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        this.setState({
          errors: json.errors
        })
      } else {
        this.setState({
          ...DEFAULT_STATE
        })

        this.props.onSuccess(json, this.props.history);
      }
    });
  }


  render() {
    const errors = this.state.errors.map((error, idx) => { return <li key={idx}>{error}</li> });

    return (
      <div>
        <div className="content-container">
          <img src={require('../../assets/blur_bg.jpg')} alt='background' />
        </div>
        <div className="register-form">
          <h1 className="meds-header">Provider Register</h1>
          <div className="ui inverted divider"></div>
          <div className="ui very padded container">
            { this.state.errors.length > 0 ?
              <div className="ui error message">
                <ul className="list">
                  { errors }
                </ul>
              </div>
            :
              null
            }

            <form className="ui large form" onSubmit={this.handleSubmit}>
              <div className="field">
                <input required name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
              </div>

              <div className="field">
                <input required name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              </div>

              <div className="field">
                <div className="two fields">
                  <div className="field">
                    <input required name="first_name" type="text" value={this.state.first_name} onChange={this.handleChange} placeholder="First Name" />
                  </div>
                  <div className="field">
                    <input required name="last_name" type="text" value={this.state.last_name} onChange={this.handleChange} placeholder="Last Name" />
                  </div>
                </div>
              </div>

              <div className="field">
                <input required name="specialty" type="text" value={this.state.specialty} onChange={this.handleChange} placeholder="Specialty" />
              </div>

              <div className="field">
                  <div className="fields">
                    <div className="twelve wide field">
                      <input name="street_one" type="text" value={this.state.street_one} onChange={this.handleChange} placeholder="Street" />
                    </div>
                    <div className="four wide field">
                      <input name="street_two" type="text" value={this.state.street_two} onChange={this.handleChange} placeholder="Apt #" />
                    </div>
                  </div>
              </div>

              <div className="three fields">
                <div className="field">
                  <input name="city" type="text" value={this.state.city} onChange={this.handleChange} placeholder="City" />
                </div>
                <div className="field">
                  <select className="ui search dropdown" name="user_state" value={this.state.user_state} onChange={this.handleChange}>
                    <option value="">State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
                <div className="field">
                  <input name="zipcode" type="number" value={this.state.zipcode} onChange={this.handleChange} placeholder="Zipcode" />
                </div>
              </div>

              <div className="two fields">
                <div className="field">
                  <input required name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                </div>
                <div className="field">
                  <input name="phone" type="tel" value={this.state.phone} onChange={this.handleChange} placeholder="Phone" />
                </div>
              </div>

              <button type="submit" className="ui large fluid button">Create Account</button>
            </form>
            <div className="ui inverted divider"></div>
            <a className="back-link" onClick={() => this.props.history.push("/register-choice")}>
               &#8592; Back
            </a>
          </div>
        </div>
      </div>
    )
  }
}
