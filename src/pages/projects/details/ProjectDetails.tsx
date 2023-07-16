import { Typography } from "@mui/material";
import { useProjectContext } from "./ProjectContext";

export const ProjectDetails = () => {
  const { project, setProject } = useProjectContext();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>Details</Typography>
      <Typography variant="body1">
        Languages (from -&gt; to): {`${project.sourceLanguage.name} -> ${project.targetLanguages.map((language) => language.name).join(', ')}`}
      </Typography>
      <Typography variant="body1">
        Accuracy: {`${project.accuracy.name} (${project.accuracy.description})`}
      </Typography>
      <Typography variant="body1">
        Industry: {`${project.industry.name} (${project.industry.description})`}
      </Typography>
      <Typography variant="body1">
        Project size: {`${project.amount} ${project.unit.name}`}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Budget: {`${project.budget} ${project.currency.name}`}
      </Typography>

      <Typography variant="h5" gutterBottom>Time frame</Typography>
      <Typography variant="body1">
        Expected start: {formatDate(project.expectedStart)}
      </Typography>
      <Typography variant="body1">
        Internal deadline: {formatDate(project.internalDeadline)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        External deadline: {formatDate(project.externalDeadline)}
      </Typography>

      <Typography variant="h5" gutterBottom>Client</Typography>
      <Typography variant="body1">
        Name: {`${project.client.name}`}
      </Typography>
      <Typography variant="body1">
        Email: {project.client.email}
      </Typography>
      <Typography variant="body1">
        Phone: {project.client.phone}
      </Typography>
    </>
  );
}