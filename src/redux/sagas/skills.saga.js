import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//GET for skills
function*  fetchSkills (action) {
    try{
      const response = yield axios.get('/api/skills');
        console.log(response.data);
        yield put ({
            type: 'SET_SKILLS',
            payload: response.data
        })
    }
    catch (err){
        console.error('error in get skills', err);
    }
}

function* skillsSaga() {
  yield takeLatest ('FETCH_SKILLS', fetchSkills);
}
  
export default skillsSaga;