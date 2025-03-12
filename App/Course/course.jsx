import ContentTwo from "./content/ContentTwo";
import ContentOne from "./content/contentOne";

function Course({ courses }) {
  return (
    <div>
      <ContentOne courses={courses} />
      <ContentTwo courses={courses} />
    </div>
  );
}

export default Course;
