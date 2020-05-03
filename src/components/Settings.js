import React from 'react';

import styles from './Settings.module.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handleIsRunningChange = this.handleIsRunningChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClearBtn = this.handleClearBtn.bind(this);

    this.state = {
      size: 10,
      speed: 1,
      isRunning: false,
      currentGen: 0
    }
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.gen !== this.props.gen) {
      this.setState({currentGen: this.props.gen})
    }
  }

  handleSizeChange(e) {
    this.setState({size: e.target.value});
  }

  handleSpeedChange(e) {
    this.setState({speed: e.target.value});
  }

  handleIsRunningChange(e) {
    e.preventDefault();

    const newState = !this.state.isRunning;
    this.setState({isRunning: newState}, () => this.props.setIsRunning(this.state.isRunning));
  }

  handleClearBtn(e) {
    e.preventDefault();

    this.props.clear();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.changeSize(this.state.size);
    this.props.changeSpeed(this.state.speed);
  }

  render() {
    return (
      <div className={styles.settings}>
        <h2>Settings</h2>
    
        <button className={styles.button} onClick={this.handleIsRunningChange}>{this.state.isRunning === true ? "Stop simulation" : "Start simulation"}</button>
        <button className={styles.button} onClick={this.handleClearBtn}>Clear</button>

        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label className={styles.option}>Board size
            <input type="number" value={this.state.size} onChange={this.handleSizeChange} id="bsize" name="bsize"/>
          </label>
          <label className={styles.option}>Generation time (sec)
            <input type="number" value={this.state.speed} onChange={this.handleSpeedChange} id="speed" name="speed"/>
          </label>
          <button>Apply changes</button>
        </form>

        <h3>Generation: {this.state.currentGen}</h3>
      </div>
    );
  }
}

export default Settings;