import React from 'react';
var ReactDOM = require('react-dom');
import NoData from '../NoData';
import LoaderData from '../LoaderData';
import { connect } from 'react-redux';
import { setTrendLoanGrade, setTrendLoanStatus, setTrendEmpLength, changeTrendFilter} from '../../../redux/actions'
import Trend  from './config';
import _ from 'lodash/core';

/**
 * VisibleTrend is a wrapper for the Trend component.  It uses uses react-redux 
 * to connect VisibleTrend with the application state (mapStateToProps) and with 
 * mapDispatchToProps to allow it to dispatch Redux actions. 
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onEmpLengthSelected: (event, href, eventKey) => {
        var eventObj = {
            targetId: event.target.id,
            selected: event.target.checked
        }
        dispatch(setTrendEmpLength(eventObj));
        dispatch(changeTrendFilter()); 
    }, 
    onGradeSelected: (event) => {
      dispatch(setTrendLoanGrade(event.target.id));
      dispatch(changeTrendFilter());
    },
    onStatusSelected: (event) => {
      dispatch(setTrendLoanStatus(event.target.id));
      dispatch(changeTrendFilter());
    },
    onClick: (param) => {
      		// TODO: add hook for trend chart events
    }
  }
}

const mapStateToProps = (state) => {
    return {
        data: state.chartData.trendData.data,
        filters: state.chartFilters,
        zoom: state.dashboard.zoom,
    }
};

var controlStyle = {
  paddingLeft: '70',
  paddingTop: '20'
};

const loadTrend = (data, width, height, onClick, type, zoom) => {
    if (!data){ 
        return (<LoaderData />);
    }
    else if(data.length == 0){
        return ( <NoData height={height}/> );
    } 
    else {
        return (
            <Trend 
              items={data}
              type={type}
              width={width}
              height={height}
              zoom={zoom}
              onClick={onClick}
            />
        );
  }
}

class VisibleTrend extends React.Component{

    constructor(state,context){
        super(state,context);
        this.state = { 
            heightMod: -50,
            widthMod: 210
        };
    }

    render(){
        let height = this.props.height - 45;
        let width = this.props.width;
        if(this.props.zoom == 'TREND')
            {
                height = 520;
                width = 1090
            }
        return(
            //jsx code
                <div className="trend">
                    {loadTrend(this.props.data, 
                               width, 
                               height, 
                               this.props.onClick, 
                               this.props.type, 
                               this.props.zoom)}
                </div>
              )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VisibleTrend);
