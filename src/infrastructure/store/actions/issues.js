import axios from 'axios';

// Actions Types
import { FETCH_ISSUES } from '../types';

const BASE_URL = 'https://gitlab.com/api';

export const fetch = labels => {
  return async dispatch => {
    try {
      const url = `${BASE_URL}/v4/projects/8813125/issues?labels=${labels.join()}&per_page=100`;
      const { data } = await axios(url, {
        headers: { 'Private-Token': 'RpGueS6tEW9De6cYAYdr' }
      });
      dispatch({
        type: FETCH_ISSUES,
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  };
};
