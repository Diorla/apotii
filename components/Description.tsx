import styled from "styled-components";
import showRemaining from "../scripts/showRemaining";
import truncateText from "../scripts/truncateText";

const StyledDiv = styled.pre`
  white-space: break-spaces;
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
`;

export default function Description({ description }: { description: string }) {
  return (
    <StyledDiv>
      {truncateText(description)}
      {description.length > 160 && (
        <span title={showRemaining(description)}>...</span>
      )}
    </StyledDiv>
  );
}
