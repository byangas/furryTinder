import React from 'react';
import { connect } from 'react-redux';
import { furryActionCreator } from "../actions/actionTypes"
import FurryService from '../services/FurryService'

const mapDispatchToProps = (dispatch) => {
    return  {
        updateFurries: (list) => dispatch(furryActionCreator.updateFurryList(list)),
        updateSettings: (settings) => dispatch(furryActionCreator.updateSettings(settings)),
        updateCurrent: (current) => dispatch(furryActionCreator.updateCurrent(current)),
        applyFilter: () => dispatch(furryActionCreator.applyFilter()),
        moveNext: () => dispatch(furryActionCreator.moveNext())
    }
}

const mapStateToProps = state => {
    return {
        furries: state.furries
    }
}

class LoadWrapper extends React.Component {

  componentDidMount() {
    const furryService = new FurryService();
    const { updateFurries, updateSettings, moveNext, applyFilter } = this.props;

    furryService.getSetting()
        .then((result) => { 
            updateSettings(result)
            return result
        })
        .then(() => {
            //now that we have settings, we can download pets
            furryService.getFurries().then((res1) => {
                updateFurries(res1);
                applyFilter();
                moveNext();
              })
        })
  }
  //since this is just a wrapper, we return all contents
  render() {   
    return this.props.children;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadWrapper)
