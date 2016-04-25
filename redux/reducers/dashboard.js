//My reducers
import { ADD_WIDGET, CLOSE_WIDGET, RESIZE_WIDGET, SET_CHART, FIRST_RENDER } from '../actions';
const initialState = {
  initial: false,
  zoom: '',
  name:'',
  widgets:[
      { id: 0, name: 'TREND CHART', type:'TREND', drow: 2, dcol: 1, dsizex: 3, dsizey: 2, width: 600, height: 400 },
      { id: 1, name: 'LOANS BY GRADE', type:'DONUT', drow: 1, dcol: 4, dsizex: 3, dsizey: 2, width: 600, height:400 },
      { id: 2, name: 'PORTFOLIO', type:'KPIPORTFOLIO', drow: 1, dcol: 1, dsizex: 1, dsizey: 1, width: 200, height:200 },
      { id: 3, name: 'O/S', type:'KPIOS', drow: 1, dcol: 2, dsizex: 1, dsizey: 1, width: 200, height:200 },
      { id: 4, name: 'DELINQ. RECENCY', type:'KPIDELINQUENCYRECENCY', 
          drow: 1, dcol: 3, dsizex: 1, dsizey: 1, width: 200, height:200 },
      { id: 5, name: 'DEF PROPENSITY', type:'KPIDEFAULTPROPENSITY', 
          drow: 3, dcol: 4, dsizex: 1, dsizey: 1, width: 200, height:200 },
       //{id: 1, name: 'WIDGET NAME', type:'EMPTY', drow: 2, dcol: 1, dsizex: 2, dsizey: 1, height: 200, width: 400 }
  ]
}

function getPos(elems,id){
    elems.forEach(function (e){
        if (e.id == id) return elems.indexOf(e);
    })
}

function getType(elems,id){
    let type = '';
    let name = '';
    elems.forEach(function (e){
        if (e.id == id) {
            type = e.type;
            name = e.name;
        }
    })
    return [type,name];
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHART:
            var res = getType(state.widgets, action.id)
            return Object.assign({}, state, {zoom: res[0], name:res[1]})

        case FIRST_RENDER:
            return Object.assign({}, state, {initial: true})

        case ADD_WIDGET:
            let obj = Object.assign({}, state, { widgets: [...state.widgets, action.data] })
            console.log(obj);
            return obj;

        case RESIZE_WIDGET:
            return Object.assign({}, state, {
                widgets: state.widgets.map((w) => {
                    return w.type === action.data.id ?
                        Object.assign({}, w, { 'width': action.data.width, 'height': action.data.height }) : w
                })
            });

        case CLOSE_WIDGET:
            return Object.assign({}, state, {
                widgets: state.widgets.filter((w) => { return w.id !== action.id })
            });

        default:
            return state
    }
};

export default data;
