import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchJob(action){
    console.log('in fetchJob', action);
    try {
        const res = yield axios.get(`/api/job`);
        yield put({ type: 'SET_JOB', payload: res.data });
    } catch (err) {
        console.log('fetchJob request failed', err);
        return;
    }
}

function* addJob(action){
    try{ 
        yield axios.post('/api/job', action.payload)
    }
    catch(err){
        console.error('error is', err)
    }
}


function* fetchCurrentJob(action){
    console.log('made it into fetchCurrent');
    try{
        const response = yield axios.get(`/api/job/${action.payload}`)
        yield put({
            type: 'SET_CURRENT_JOB',
            payload: response.data
        })
    }
    catch(err){
        console.error('error in fetchCurrentJob', err)
    }
}
function* fetchMatchedCandidates(action) {
    try{
        const res = yield axios.get('/api/job/candidates/'+ action.payload.id)
    }
    catch(err){
        console.log('Failed to fetch matched candidates', err)

    }
}

function* deleteFromJobList(action) {
    try{
        const res = yield axios.put('/api/job/remove/' + action.payload.id)
        yield put({
            type: 'FETCH_JOB'
        })
    }
    catch(err){
        console.log('Failed to delete from job list', err)
    }
}

function* jobSaga() {
    yield takeLatest('FETCH_JOB', fetchJob);
    yield takeLatest('ADD_JOB', addJob);
    yield takeLatest('FETCH_CURRENT_JOB', fetchCurrentJob);
    yield takeLatest('FETCH_MATCHED_CANDIDATES', fetchMatchedCandidates)
    yield takeLatest('DELETE_FROM_JOB_LIST', deleteFromJobList)

  }

export default jobSaga;