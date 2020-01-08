import React, { useState } from 'react';
import useFetchIssues from '../../../infrastructure/hooks/useFetchIssues';
import Issue from '../../../domain/models/Issue';
import MergeRequest, { MergeRequestStatus } from '../../../domain/models/MergeRequest';

const DoneIssues = () => {
  const [labels] = useState(['Done']);
  const [issues, isLoading] = useFetchIssues(labels);
  const labelsToShow = ['Bug', 'Feature', 'Enhancement', 'CC'];

  const filterIssuesWithoutLabels = (labels: Array<string>) => {
    return issues.filter((issue: Issue) => {
      return !labels.find(label => issue.labels && issue.labels.indexOf(label) !== -1);
    });
  };

  const isMergedMergeRequests = (mergeRequests: MergeRequest[]) => {
    return mergeRequests
      .filter(
        mergeRequest => mergeRequest.mergeStatus === MergeRequestStatus.merged
      ).length > 0;
  };

  const renderIssuesByLabel = (label: string | null, title: string) => {
    const filterIssues = label ? issues.filter(
      ({ labels }: Issue) => labels && labels.indexOf(label) !== -1
    ) : filterIssuesWithoutLabels(labelsToShow);

    if (filterIssues.length === 0) {
      return null;
    }

    return (
      <div style={{ marginBottom: 20 }}>
        <div>{title}:</div>
        <br/>
        {filterIssues.map(({ iid, title, relatedMergeRequests }) => (
          <div key={iid}>
            * #{iid} - {title} ({isMergedMergeRequests(relatedMergeRequests || []) ? 'Merged': 'Pending'})
          </div>
        ))}
      </div>
    );
  };


  if (isLoading) {
    return <section>Cargando...</section>;
  }

  return (
    <section>
      <section>Issues: {issues.length}</section>
      <br/>
      {renderIssuesByLabel('Bug', 'Fix')}
      {renderIssuesByLabel('Feature', 'Feature')}
      {renderIssuesByLabel('Enhancement', 'Mejoras')}
      {renderIssuesByLabel('CC', 'Control de Cambios')}
      {renderIssuesByLabel(null, 'Otros')}
    </section>
  );
};

export default DoneIssues;
