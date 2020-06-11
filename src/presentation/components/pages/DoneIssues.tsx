import React, { useState } from 'react';
import useFetchIssues from '../../../infrastructure/hooks/useFetchIssues';
import Issue from '../../../domain/models/Issue';
import MergeRequest, {
  MergeRequestStatus,
} from '../../../domain/models/MergeRequest';

const DoneIssues = () => {
  const [labels] = useState(['Done By Dev']);
  const [issues, isLoading] = useFetchIssues(labels);

  const labelsWithDescriptionToShow = [
    { label: 'type:: Bug', description: 'Fix' },
    { label: 'type:: Feature', description: 'Feature' },
    { label: 'type:: Enhancement', description: 'Mejoras' },
    { label: 'type:: CC', description: 'Control de Cambios' },
  ];

  const filterIssuesWithoutLabels = (labels: Array<string>) => {
    return issues.filter((issue: Issue) => {
      return !labels.find(
        (label) => issue.labels && issue.labels.indexOf(label) !== -1
      );
    });
  };

  const isMergedMergeRequests = (mergeRequests: MergeRequest[]) => {
    return (
      mergeRequests.length > 0 &&
      mergeRequests.filter(
        (mergeRequest) => mergeRequest.mergeStatus === MergeRequestStatus.merged
      ).length === mergeRequests.length
    );
  };

  const renderIssuesByLabel = (label: string | null, title: string) => {
    const filterIssues = label
      ? issues.filter(
          ({ labels }: Issue) => labels && labels.indexOf(label) !== -1
        )
      : filterIssuesWithoutLabels(
          labelsWithDescriptionToShow.map(({ label }) => label)
        );

    if (filterIssues.length === 0) {
      return null;
    }

    return (
      <div style={{ marginBottom: 20 }}>
        <div>{title}:</div>
        <br />
        {filterIssues.map(({ iid, title, relatedMergeRequests }) => (
          <div key={iid}>
            * #{iid} - {title} (
            {isMergedMergeRequests(relatedMergeRequests || [])
              ? 'Merged'
              : 'Pending'}
            )
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
      <br />
      {labelsWithDescriptionToShow.map(({ label, description }) =>
        renderIssuesByLabel(label, description)
      )}
      {renderIssuesByLabel(null, 'Otros')}
    </section>
  );
};

export default DoneIssues;
