import { useEffect, useState } from 'react';
import Issue from '../../domain/models/Issue';
import axios from 'axios';

const BASE_URL = 'https://gitlab.com/api';

const useFetchIssues = (labels: Array<string>): [Array<Issue>, boolean] => {
  const [issues, setIssues] = useState<Array<Issue>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIssues = async (labels: Array<string>) => {
      try {
        const url = `${BASE_URL}/v4/projects/8813125/issues?labels=${labels.join()}&per_page=100`;
        const { data } = await axios.get(url, {
          headers: { 'Private-Token': 'RpGueS6tEW9De6cYAYdr' }
        });
        return data.map(Issue.apiResponseToInstance);
      } catch (error) {
        console.log(error);
        return [];
      }
    };

    const loadIssues = async () => {
      setIsLoading(true);
      const issues = await fetchIssues(labels);
      setIssues(issues);
      setIsLoading(false);
    };

    loadIssues();
  }, [labels]);

  return [issues, isLoading];
};

export default useFetchIssues;
