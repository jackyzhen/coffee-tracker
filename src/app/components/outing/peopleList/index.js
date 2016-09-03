import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import Avatar from 'material-ui/Avatar';


export default class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chipData: props.people,
    };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '10px',
      },
    };
  }

  renderChip(data) {
    const { handleRequestDelete, handleTouchTap } = this.props;
    return (
      <Chip
        key={data.key}
        onRequestDelete={handleRequestDelete && (() => handleRequestDelete(data.key))}
        onTouchTap={handleTouchTap && (() => handleTouchTap(data.key))}
        style={this.styles.chip}
      >
        <Avatar color="#564032" icon={<SvgIconFace />} />
        <span style={{ color: '#564032' }}>{data.label} - {`(${data.numCoffeeDrank} D / ${data.numCoffeePaid} P)`} </span>
      </Chip>
    );
  }
  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    );
  }
}

PeopleList.propTypes = {
  handleRequestDelete: PropTypes.func,
  handleTouchTap: PropTypes.func,
  people: PropTypes.array,
};

PeopleList.displayName = 'PeopleList';