import { useEffect, useState } from 'react';
import Issue, { IssueState } from '../../domain/models/Issue';
import axios from 'axios';
import MergeRequest from '../../domain/models/MergeRequest';

const BASE_URL = 'https://gitlab.com/api';

const useFetchIssues = (labels: Array<string>): [Array<Issue>, boolean] => {
  const [issues, setIssues] = useState<Array<Issue>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIssues = async (labels: Array<string>): Promise<Issue[]> => {
      try {
        const url = `${BASE_URL}/v4/projects/8813125/issues?labels=${labels.join()}&per_page=100&state=${IssueState.opened}`;
        const { data } = await axios.get(url, {
          headers: { 'Private-Token': 'RpGueS6tEW9De6cYAYdr' }
        });
        return data.map(Issue.apiResponseToInstance);
      } catch (error) {
        console.log(error);
        return [];
      }
    };

    const fetchRelatedMergeRequests = async (issue: Issue): Promise<MergeRequest[] | undefined> => {
      try {
        const url = `${BASE_URL}/v4/projects/8813125/issues/${issue.iid}/related_merge_requests?state=${IssueState.opened}`;
        const { data } = await axios.get(url, {
          headers: { 'Private-Token': 'RpGueS6tEW9De6cYAYdr' }
        });
        return data.map(MergeRequest.apiResponseToInstance);
      } catch (error) {
        console.log(error);
      }
    };


    const loadIssues = async () => {
      setIsLoading(true);
      const issues = await fetchIssues(labels);
      for (let i = 0; i < issues.length; i++) {
        issues[i].relatedMergeRequests = await fetchRelatedMergeRequests(issues[i]);
      }
      setIssues(issues);
      setIsLoading(false);
    };

    loadIssues();
  }, [labels]);

  return [issues, isLoading];
};

export default useFetchIssues;
