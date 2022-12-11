import { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

export class EditableText extends Component {
  static defaultProps = {
    onLoose: () => { }
  }

  static propTypes = {
    onLoose: PropTypes.func
  }

  state = {
    hidden: true,
    value: this.props.text
  }

  setValue = ({ target: { value } }) => {
    this.setState({ value })
  }

  handleBlur = (e) => {
    e.preventDefault();

    this.setState({ hidden: true });

    this.props.onLoose(this.state.value)
  }

  showInput = () => {
    this.setState({ hidden: false })
  }

  render() {
    const { value, hidden } = this.state
    const { multiLine, stylesInput } = this.props

    return (
      hidden ? <span onClick={this.showInput}>{value ? value : this.props.text}</span> :
      <form className={styles.editableText} onSubmit={this.handleBlur}>
        {
          multiLine ?
          <textarea name="description" className={styles.description} onChange={this.setValue} onBlur={this.handleBlur} value={value} autoFocus /> :
          <input className={stylesInput} name="text" value={value} onChange={this.setValue} onBlur={this.handleBlur} autoFocus />
        }
      </form>
    )
  }
}
