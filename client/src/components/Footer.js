import React, {Component} from 'react';

export default class Footer extends Component {

  render() {
    return (
      <footer>
        <ul>
          <li>Copyright &copy; {(new Date()).getFullYear()} Factto Lotto</li>
          <li>Facts supplied by <a href="http://www.numbersapi.com" target="_blank">Numbers API</a></li>
        </ul>
      </footer>
    );
  }

  renderBtnById(id) {
    if (typeof this.props.renderItem === 'function') {
      return this.props.renderItem(id);
    }
  }

}